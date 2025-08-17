import cors from "cors";

const corsMW = cors({
  origin: "http://localhost:5577",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

export default corsMW;
