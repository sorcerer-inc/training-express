import * as express from "express";
import * as foo from "./foo";
import * as users from "./users";

import { HogeController, UserController } from "../controllers";

import {db_pool} from "../helpers/DBHelper";
import {RowDataPacket} from "mysql2";

export const router = express.Router();

const hogeController = new HogeController();
const userController = new UserController();

router.get("/", (req, res, next) => {
  res.status(200);
  res.json({ text: "Hello World" });
});
router.get("/errorSample", hogeController.errorResponse);

router.use("/foo", foo.router);

//test mysql2
router.get("/db", async (req, res, next) => {
  const [rows] = await db_pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) FROM `users_items`;",
  );

  res.status(200);
  res.json({ text: rows });

});

router.use("/users", users.router);
router.post("/login", userController.login);
