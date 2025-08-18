import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "5m",
  });
};

export const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "3d",
    }
  );
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 6);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateTokenPair = (userId, role) => {
  return {
    accessToken: generateAccessToken(userId, role),
    refreshToken: generateRefreshToken(userId, role),
  };
};
