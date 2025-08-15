import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// ===================
// Registerations Routes
//======================

// ===================
//     ADMIN
//======================
router.post("/register/admin", async (req, res) => {
  res.send({ message: "I am fine" });
  const { fullName, username, password, email, phoneNumber } = req.body;

  // Input validation
  if (!fullName || !username || !password || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 6);

    const admin = await prisma.admin.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
      },
    });

    const token = jwt.sign(
      {
        id: admin.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    res.sendStatus(503);
  }
});

// ===================
//   USER
//======================

router.post("/register/user", async (req, res) => {
  res.send({ message: "I am fine" });
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

  // Input validation
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
    const hashedPassword = await bcrypt.hash(password, 6);

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
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username, email, or licence ID already exists" });
    }
    res.sendStatus(503);
  }
});

// ===================
//  BUS STATIONS
//======================

router.post("/register/busstation", async (req, res) => {
  res.send({ message: "I am fine" });
  const { stationName, username, password, email, phoneNumber, location } =
    req.body;

  // Input validation
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
    const hashedPassword = await bcrypt.hash(password, 6);

    const newBusStation = await prisma.busStation.create({
      data: {
        stationName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
        location,
      },
    });

    const token = jwt.sign(
      {
        id: newBusStation.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json(token);
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    res.sendStatus(503);
  }
});

// ===================
//  LOGIN Routes
//======================

// ===================
//     ADMIN
//======================
router.post("/login/admin", async (req, res) => {
  res.send({ message: "I am fine" });
  const { username, password } = req.body;

  // Input validation
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

    const passwordIsValid = await bcrypt.compare(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// ===================
//     USER
//======================

router.post("/login/user", async (req, res) => {
  res.send({ message: "I am fine" });
  const { username, password } = req.body;

  // Input validation
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

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// ===================
//  BUS STATIONS
//======================

router.post("/login/busstation", async (req, res) => {
  res.send({ message: "I am fine" });
  const { username, password } = req.body;

  // Input validation
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

    const passwordIsValid = await bcrypt.compare(password, busStation.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: busStation.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;

res.send({ message: "I am fine" });
