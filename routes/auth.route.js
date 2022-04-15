import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import AuthController from "../controllers/auth.controllers";
import guard from "../middlewares/guard.middleware";
const router = new Router();

router.post("/login", tryCatchWrapper(AuthController.login));
router.post("/logout", guard, tryCatchWrapper(AuthController.logout));
router.get("/refresh", guard, tryCatchWrapper(AuthController.refresh));

export default router;
