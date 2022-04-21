import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import CompanyController from "../controllers/companies.controller";

const router = new Router();

router.post(
  "/create-company",
  tryCatchWrapper(CompanyController.createCompany)
);
router.get("/get-companies", tryCatchWrapper(CompanyController.getCompanies));
router.get(
  "/get-user-companies",
  tryCatchWrapper(CompanyController.getUserCompanies)
);
router.patch(
  "/change-accounter",
  tryCatchWrapper(CompanyController.changeAccounter)
);

export default router;
