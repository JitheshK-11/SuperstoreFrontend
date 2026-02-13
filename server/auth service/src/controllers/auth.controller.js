import { authService } from "../services/auth.service.js";

export const authController = {

  sendOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const result = await authService.sendOTP(phoneNumber);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phoneNumber, otp, fullName } = req.body;
      const result = await authService.verifyOTP(phoneNumber, otp, fullName);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshSession(refreshToken);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.logout(refreshToken);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await authService.getAllUsers();
      res.json({ users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
