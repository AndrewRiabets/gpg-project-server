import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import AuthController from "../controllers/auth.controllers";
import guard from "../middlewares/guard.middleware";
const router = new Router();

router.post("/login", tryCatchWrapper(AuthController.login));
router.get("/refresh", tryCatchWrapper(AuthController.refresh));
router.post("/logout", tryCatchWrapper(AuthController.logout));

export default router;
