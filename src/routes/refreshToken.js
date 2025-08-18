import express from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/utils.js";

const route = express.Router();

route.post("/", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No token found!" });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user.id, user.role);
    return res.json({ accessToken: newAccessToken });
  });
});

export default route;
