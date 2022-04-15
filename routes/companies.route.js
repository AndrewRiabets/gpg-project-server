import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import CompanyController from "../controllers/companies.controller";

const router = new Router();

router.post(
  "/create-company",
  tryCatchWrapper(CompanyController.createCompany)
);
router.get("/get-companies", tryCatchWrapper(CompanyController.getCompanies));

export default router;
