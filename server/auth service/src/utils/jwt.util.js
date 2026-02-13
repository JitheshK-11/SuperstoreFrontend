import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateAccessToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyAccessToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
