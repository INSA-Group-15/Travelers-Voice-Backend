import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  hashPassword,
  verifyPassword,
} from "../utils/utils.js";
import prisma from "../config/prismaClient.js";

const router = express.Router();

// ===================
// Registerations Routes
//======================

// ===================
//     ADMIN
//======================
router.post("/register/admin", async (req, res) => {
  const { fullName, username, password, email, phoneNumber } = req.body;

  if (!fullName || !username || !password || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = hashPassword(password);

    const admin = await prisma.admin.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
        role: "ADMIN",
      },
    });

    const token = generateAccessToken(admin.id, admin.role);

    return res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    return res.sendStatus(503);
  }
});

// ===================
//   USER
//======================

router.post("/register/user", async (req, res) => {
  const {
    licenceId,
    role,
    fullName,
    username,
    email,
    phoneNumber,
    password,
    location,
  } = req.body;

  if (
    !licenceId ||
    !role ||
    !fullName ||
    !username ||
    !email ||
    !phoneNumber ||
    !password ||
    !location
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        licenceId,
        role,
        fullName,
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        location,
        status: "active",
        role: "USER",
      },
    });

    const token = generateAccessToken(newUser.id, newUser.role);
    return res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username, email, or licence ID already exists" });
    }
    return res.sendStatus(503);
  }
});

// ===================
//  BUS STATIONS
//======================

router.post("/register/busstation", async (req, res) => {
  const { stationName, username, password, email, phoneNumber, location } =
    req.body;

  if (
    !stationName ||
    !username ||
    !password ||
    !email ||
    !phoneNumber ||
    !location
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = hashPassword(password);

    const newBusStation = await prisma.busStation.create({
      data: {
        stationName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
        location,
        status: "active",
        role: "MANAGER",
      },
    });
    const token = generateAccessToken(newBusStation.id, newBusStation.role);

    return res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    return res.sendStatus(503);
  }
});

// ===================
// ===================
// ===================
//  LOGIN Routes
//======================
//======================
//======================

// ===================
//     ADMIN
//======================
router.post("/login/admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        username: username,
      },
    });

    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const passwordIsValid = verifyPassword(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateAccessToken(admin.id, admin.role);

    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

// ===================
//     USER
//======================

router.post("/login/user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = verifyPassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateAccessToken(user.id, user.role);
    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

// ===================
//  BUS STATIONS
//======================

router.post("/login/busstation", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const busStation = await prisma.busStation.findUnique({
      where: {
        username: username,
      },
    });

    if (!busStation) {
      return res.status(404).send({ message: "Bus station not found" });
    }

    const passwordIsValid = verifyPassword(password, busStation.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateAccessToken(busStation.id, busStation.role);
    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

export default router;

// res.send({message: "I am fine"})
