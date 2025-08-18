import prisma from "../config/prismaClient.js";

// ===================
//  creating reports
//======================

export const createReport = async (req, res) => {
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
    return res.json({message: "Incomplete Data"});
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
};

// ===================
//  reading the reports
//======================
export const readAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    return res.json(reports);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
};

// ===================
//  Updating the reports
//======================

export const updateReportStatus = async (req, res) => {
  const {status} = req.body;

  try {
    const id = req.params;
    const report = prisma.report.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });

    res.json(report);
  } catch (err) {
    console.log(err);
    return res.sendStatus(503);
  }
};

// ====================
//  Delete the reports
//======================
export const deleteReport = async (req, res) => {
  const {status} = req.body;

  try {
    const id = req.params;
    await prisma.report.update({
      where: {
        id: parseInt(id),
      },
    });

    res.json({message: "Report deleted successfully"});
  } catch (err) {
    console.log(err);
    return res.sendStatus(503);
  }
};
