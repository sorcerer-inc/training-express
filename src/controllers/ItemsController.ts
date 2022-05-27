import {Response, Request, NextFunction} from "express";
import * as Items from "../services/ItemrsService"
const log = require('log4js').getLogger("index");


export class ItemsController {
  async getList(req: Request, res :Response){
    const result = await Items.getList();

    if (result.statusCode == 200) {
      res.status(200);
      res.json(result.data);
    } else if (result.statusCode == 500) {
      res.status(500);
      res.json(result.data);
    }
  }

  async post(req: Request, res :Response){
    const result = await Items.post(req.body);

    if (result.statusCode == 200) {
      res.status(200).end();
    } else if (result.statusCode == 500) {
      res.status(500).end();
    }
  }


  async get(req: Request, res :Response){
    const result = await Items.get(req.params.id);

    if (result.statusCode == 200) {
      res.status(200);
      res.json(result.data);
    } else if (result.statusCode == 500) {
      res.status(500).end();
    }
  }

  async put(req: Request, res :Response){
    const putData = {
      'id': req.params.id,
      'name': req.body.name,
      'heal': req.body.heal,
      'price': req.body.price,
    }

    const result = await Items.put(putData);

    if (result.statusCode == 200) {
      res.status(200).end();
    } else if (result.statusCode == 500) {
      res.status(500).end();
    }
  }

  async delete(req: Request, res :Response){
    const result = await Items.dataDelete(req.params.id);

    if (result.statusCode == 200) {
      res.status(200).end();
    } else if (result.statusCode == 500) {
      res.status(500).end();
    }
  }
}
