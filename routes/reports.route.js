import { Router } from "express";
import {
  getReports,
  getReportById,
  addReport,
  removeReport,
  updateReport,
} from "../controllers/reports.controller";

const router = new Router();

router.get("/get-companies", getReports);
router.get("/:id", getReportById);
router.post("/add-report", addReport);
router.delete("/:id", removeReport);
router.put("/:id", updateReport);

export default router;
