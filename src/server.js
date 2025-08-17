import express from "express";
import authRoutes from "./routes/authRoutes.js";
import reportsRoutes from "./routes/reportRoutes.js";
import { globalLimiter, authLimiter } from "./middlewares/limiterMW.js";
import helmetMW from "./middlewares/helmetMW.js";
import corsMW from "./middlewares/corsMW.js";
import authorizeAccessByRole from "./middlewares/authRolesMW.js";
import authorizeAccessByToken from "./middlewares/authJWTMW.js";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json({ limit: "10mb" }));

app.use(helmetMW);
app.use(corsMW);
app.use(globalLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use(
  "/api/reports",
  authorizeAccessByRole,
  authorizeAccessByToken,
  reportsRoutes
);

app.get("/", (req, res) => {
  res.send("Doing well :)");
});

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});
