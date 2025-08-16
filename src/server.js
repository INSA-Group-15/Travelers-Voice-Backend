import express from "express";
import authRoutes from "./routes/authRoutes.js";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(helmet());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Doing well :)");
});

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});
