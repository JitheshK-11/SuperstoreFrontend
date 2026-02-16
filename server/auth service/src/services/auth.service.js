import {generateOTP} from '../utils/otp.util.js';
import { hashPassword,comparePassword } from '../utils/hash.util.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.util.js';
import {authRepository} from '../repositories/auth.repository.js';
import { sendSms } from "../utils/sms.util.js";

export const authService = {
  sendOTP: async (phoneNumber) => {
    const otp = generateOTP();
    const hashedOtp = await hashPassword(otp);

    await authRepository.saveOTP(phoneNumber, hashedOtp, { expireAt: new Date(Date.now() + 5 * 60 * 1000) });
    await sendSms({
      to: phoneNumber,
      body: `Your verification code is ${otp}`
    });
    return { message: "OTP sent" };
  },

  verifyOTP: async (phoneNumber, otp, fullName) => {
    const otpRecord = await authRepository.getOTP(phoneNumber);
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new Error("OTP expired or not found");
    }
    const isValid = await comparePassword(otp, otpRecord.otpHash);
    if (!isValid) {
      throw new Error("Invalid OTP");
    }
    let user = await authRepository.findUserByPhone(phoneNumber);
    if (!user) {
      const [createuser] = await authRepository.createUser({
        phoneNumber,
        fullName
      });
      user = createuser;
    }
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });

    await authRepository.createSession({
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
    return { accessToken, refreshToken };
  },

  refreshSession: async (refreshToken) => {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
      if(!payload.userId) {
        throw new Error("Invalid token payload");
      }

    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const session = await authRepository.findSessionByRefreshToken(refreshToken);
    if (!session || session.expiresAt < new Date()) {
      throw new Error("Session expired or not found");
    }

    const user = await authRepository.findUserById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = generateAccessToken({ userId: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id });

    await authRepository.updateSessionToken(session.id, {
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  logout: async (refreshToken) => {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      if (!payload?.userId) {
        throw new Error("Invalid token payload");
      }
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const session = await authRepository.findSessionByRefreshToken(refreshToken);
    if (!session || session.expiresAt < new Date()) {
      throw new Error("Session expired or not found");
    }

    await authRepository.deleteSessionByRefreshToken(refreshToken);
    return { message: "Logged out" };
  },

  getAllUsers: async () => {
    return authRepository.getAllUsers();
  }
};

