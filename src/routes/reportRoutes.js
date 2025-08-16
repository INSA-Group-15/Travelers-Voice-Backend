import express from "express";
import prisma from "../prismaClient.js";

// ===================
//  ccreatignng repo
//======================

const router = express.Router();

router.post("/reportissue", (req, res) => {
  const {
    type,
    description,
    submittedById,
    submittedByRole,
    startingStation,
    destinationStation,
    locationPoint,
    locationRegion,
    locationCity,
    status,
    attachments,
  } = req.body;

  if (
    !type ||
    !description ||
    !submittedById ||
    !locationPoint ||
    !locationRegion ||
    !locationCity ||
    !attachments
  ) {
    return res.json({ message: "Incomplete Data" });
  }

  try {
    prisma.report.create({
      data: {
        type,
        description,
        submittedById,
        submittedByRole,
        startingStation,
        destinationStation,
        locationPoint,
        locationRegion,
        locationCity,
        status,
        attachments,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

router.get("/reportissue", (req, res) => {
  try {
    const reports = prisma.report.findMany();
    return res.json(reports);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

export default router;
