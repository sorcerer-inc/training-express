import { Response, Request, NextFunction } from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  login,
  buyItem,
  useItem,
} from "../services/UserService";
import {
  NotFoundError,
  AuthError,
  NotEnoughError,
  LimitExceededError,
} from "../interfaces/MyError";

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllUsers();

      res.status(200);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    if (
      !req.body.name ||
      !req.body.password ||
      !req.body.money ||
      !req.body.hp
    ) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const result = await createUser(req.body);
      res.status(200);
      res.json({ id: result });
    } catch (e) {
      next(e);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id || parseInt(req.params.id) == undefined) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const result = await getUser(parseInt(req.params.id));

      res.status(200);
      res.json(result);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    if (
      !req.params.id ||
      !req.body.name ||
      !req.body.password ||
      !req.body.money ||
      !req.body.hp
    ) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const password = req.body.password;
      const money = parseInt(req.body.money);
      const hp = parseInt(req.body.hp);

      const result = await updateUser({ id, name, password, money, hp });
      if (result) {
        res.status(200).end();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    if (!req.body.id || !req.body.password) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(req.body.id);
      const password = req.body.password;
      const result = await login({ id, password });
      if (result) {
        res.status(200).end();
      }
    } catch (e) {
      if (e instanceof AuthError) {
        res.status(401).end(e.message);
      } else {
        next(e);
      }
    }
  }

  async buyItem(req: Request, res: Response, next: NextFunction) {
    if (!req.body.id || !req.body.item_id || !req.body.num) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(req.body.id);
      const item_id = parseInt(req.body.item_id);
      const num = parseInt(req.body.num);
      const result = await buyItem({ id, item_id, num });
      res.status(200).end();
    } catch (e) {
      if (e instanceof NotEnoughError) {
        res.status(403).end();
      } else if (e instanceof NotFoundError) {
        res.status(404).end();
      } else if (e instanceof LimitExceededError) {
        res.status(405).end();
      } else {
        next(e);
      }
    }
  }

  async useItem(req: Request, res: Response, next: NextFunction) {
    if (!req.body.id || !req.body.item_id || !req.body.num) {
      res.status(400);
      res.json({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(req.body.id);
      const item_id = parseInt(req.body.item_id);
      const num = parseInt(req.body.num);
      const result = await useItem({ id, item_id, num });
      res.status(200).end();
    } catch (e) {
      if (e instanceof NotEnoughError) {
        res.status(403).end();
      } else if (e instanceof NotFoundError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  }

  /**
   * next(err)を投げるとapp.tsでエラーハンドリングできます。
   * https://expressjs.com/ja/guide/error-handling.html
   */
  errorResponse(req: Request, res: Response, next: NextFunction) {
    next(new Error("エラー発生"));
  }
}
