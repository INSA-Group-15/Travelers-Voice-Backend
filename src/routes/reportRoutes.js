import express from "express";
import prisma from "../prismaClient.js";

// ===================
//  creating reports
//======================

const router = express.Router();

router.post("/reports", async (req, res) => {
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
    await prisma.report.create({
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

// ===================
//  reading the reports
//======================
router.get("/reports", async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    return res.json(reports);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

// ===================
//  Updating the reports
//======================

router.put("/reports:id", async (req, res) => {
const id = req.params
const report 





});

export default router;
