import express from "express";
import {
  registerAdmin,
  registerUser,
  registerBusStationManager,
  loginAdmin,
  loginUser,
  loginBusStationManager,
} from "../controllers/authController.js";

const router = express.Router();

// ===================
// Registerations Routes
//======================

router.post("/register/admin", registerAdmin);

router.post("/register/user", registerUser);

router.post("/register/bus-station", registerBusStationManager);

// ===================
//  LOGIN Routes
//======================

router.post("/login/admin", loginAdmin);

router.post("/login/user", loginUser);

router.post("/login/bus-station", loginBusStationManager);

export default router;
