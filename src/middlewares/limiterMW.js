import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  message: "Too many attempt, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 100,
  max: 5,
  message: "Too many attempt, please try again later.",
});
