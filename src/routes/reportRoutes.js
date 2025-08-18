import express from "express";

import {
  createReport,
  readAllReports,
  updateReportStatus,
  deleteReport,
} from "../controllers/reportController.js";

const router = express.Router();

//  CRUD endpoints for report
router.post("/reports", createReport);

router.get("/reports/all", readAllReports);

router.put("/reports/:id", updateReportStatus);

router.delete("/reports/:id", deleteReport);

export default router;
