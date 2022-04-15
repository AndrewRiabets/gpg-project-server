import { Router } from "express";
import tryCatchWrapper from "../helpers/try.wrapper";
import UsersController from "../controllers/users.controllers";

const router = new Router();

router.post("/create-user", tryCatchWrapper(UsersController.createUser));
router.get("/get-users", tryCatchWrapper(UsersController.getUsers));

export default router;
