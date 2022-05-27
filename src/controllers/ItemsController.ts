import {Response, Request, NextFunction} from "express";
import * as Items from "../services/ItemrsService"
const log = require('log4js').getLogger("index");


export class ItemsController {
  async getList(req: Request, res :Response){
    const result = await Items.getList();
    res.json({result: result.data})
  }

  async post(req: Request, res :Response){
    const result = await Items.post(req.body);
    res.json({result: result.id})
  }


  async get(req: Request, res :Response){
    const result = await Items.get(req.body);
    res.json({result: result.data})
  }

  async put(req: Request, res :Response){
    const result = await Items.put(req.body);
    res.json({result: result.data})
  }

  async delete(req: Request, res :Response){
    const result = await Items.dataDelete(req.body);
    res.json({result: result.data})
  }
}
