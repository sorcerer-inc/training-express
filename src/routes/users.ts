import * as express from "express";
import { UserController } from "../controllers";
import { dbPool } from "../helpers/db-helper";
export const router = express.Router();

const userController = new UserController();

//    /users

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
