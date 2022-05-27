import * as express from "express";
import {ItemsController} from "../controllers";
export const router = express.Router();

const itemsController = new ItemsController();

router.get("/", itemsController.getList);
router.post("/", itemsController.post);
router.get("/:id", itemsController.get);
router.put("/:id", itemsController.put);
router.delete("/:id", itemsController.delete);

