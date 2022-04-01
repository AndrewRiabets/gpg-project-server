import { Router } from "express";
import {
  getCompanies,
  getCompanyById,
  addCompany,
  removeCompany,
  updateCompany,
} from "../controllers/companies.controller";
import roleAccess from "../middlewares/role.access";
import{Role} from '../helpers/constants'

const router = new Router();

router.get("/get-companies", getCompanies);
router.get("/:id", getCompanyById);
router.post("/add-company", roleAccess(Role.ADMIN), addCompany);
router.delete("/:id", roleAccess(Role.ADMIN), removeCompany);
router.put("/:id", roleAccess(Role.ADMIN), updateCompany);

export default router;
