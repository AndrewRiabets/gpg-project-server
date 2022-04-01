import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import guard from '../middlewares/guard.middleware';
const router = new Router();

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);
router.post("/logout", guard, AuthController.logout);
// router.get('/refresh', AuthController.refresh)

export default router;
