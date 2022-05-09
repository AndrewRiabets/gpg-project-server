import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import ReportsController from "../controllers/reports.controller";

const router = new Router();

router.post("/create-report", tryCatchWrapper(ReportsController.createReport));
router.get(
  "/get-company-reports",
  tryCatchWrapper(ReportsController.getCompanyReports)
);
router.get(
  "/get-company-report",
  tryCatchWrapper(ReportsController.getCompanyReport)
);
router.patch(
  "/update-company-report",
  tryCatchWrapper(ReportsController.updateReport)
);

export default router;
