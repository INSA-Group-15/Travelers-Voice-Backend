import prisma from "../config/prismaClient.js";
import {
  hashPassword,
  generateTokenPair,
  verifyPassword,
} from "../utils/utils.js";

// ===================
// Registeration controllers
//======================

// ===================
//     ADMIN
//======================
export const registerAdmin = async (req, res) => {
  const { fullName, username, password, email, phoneNumber } = req.body;

  if (!fullName || !username || !password || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await await hashPassword(password);
    console.log(hashedPassword);

    const admin = await prisma.admin.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
      },
    });

    const token = generateTokenPair(admin.id, admin.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refresh-token",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    return res.sendStatus(503);
  }
};

// ===================
//   USER
//======================
export const registerUser = async (req, res) => {
  const {
    licenceId,
    fullName,
    username,
    email,
    phoneNumber,
    password,
    location,
  } = req.body;

  if (
    !licenceId ||
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
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        licenceId,
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

    const token = generateTokenPair(newUser.id, newUser.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username, email, or licence ID already exists" });
    }
    return res.sendStatus(503);
  }
};

// ===================
//  BUS STATIONS
//======================

export const registerBusStationManager = async (req, res) => {
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
    const hashedPassword = await hashPassword(password);

    const newBusStation = await prisma.busStation.create({
      data: {
        stationName,
        username,
        password: hashedPassword,
        email,
        phoneNumber,
        location,
        status: "active",
      },
    });
    const token = generateTokenPair(newBusStation.id, newBusStation.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    return res.sendStatus(503);
  }
};

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
export const loginAdmin = async (req, res) => {
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

    const passwordIsValid = await verifyPassword(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateTokenPair(admin.id, admin.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
};

// ===================
//     USER
//======================

export const loginUser = async (req, res) => {
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

    const passwordIsValid = await verifyPassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateTokenPair(user.id, user.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
};

// ===================
//  BUS STATIONS
//======================

export const loginBusStationManager = async (req, res) => {
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

    const passwordIsValid = await verifyPassword(password, busStation.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateTokenPair(busStation.id, busStation.role);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    return res.json({ accessToken: token.accessToken });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
};
