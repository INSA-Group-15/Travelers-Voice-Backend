import { express } from "express";
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
  const { fullName, username, password, email, phoneNumber } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
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
    res.sendStatus(503);
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

  const hashedPassword = bcrypt.hashSync(password, 7);

  try {
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
    res.sendStatus(503);
  }
});

// ===================
//  BUS STATIONS
//======================

router.post("/register/busstation", async (req, res) => {
  const { stationName, username, password, email, phoneNumber, location } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 7);

  try {
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
    res.sendStatus(503);
  }
});

export default router;

// ===================
//  LOGIN Routes
//======================

// ===================
//     ADMIN
//======================
router.post("/login/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

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
//     USER
//======================

router.post("/login/user", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

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
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});
