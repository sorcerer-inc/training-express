import {Response, Request, NextFunction} from "express";
import * as ItemsService from "../services/itemsService"
import {ItemsData} from "../interfaces/items";
import {ConflictError, DBError, NotFoundError} from "../interfaces/my-error";
import * as typeGuard from "../helpers/typeGuard";
const log = require('log4js').getLogger("index");


export class ItemsController {
  //全件取得
  async getList(req: Request, res :Response<ItemsData[]>, next :NextFunction){
    try {
      const result = await ItemsService.getList();
      const resData: ItemsData[] = result;
      res.json(resData);
    }
    catch (e) {
      next(e);
    }
  }

  //１件作成
  async post(req: Request, res :Response, next :NextFunction){
    //作成に必要なデータの確認
    if (!req.body.id || !req.body.name || !req.body.heal || !req.body.price) {
      res.status(400).end();
      return;
    }

    let id: number;
    let name: string;
    let heal: number;
    let price: number;
    //パラメータの型チェック
    if(typeGuard.numberCheck(req.body.id) &&
      typeGuard.stringCheck(req.body.name) &&
      typeGuard.numberCheck(req.body.heal) &&
      typeGuard.numberCheck(req.body.price)) {
      id = req.body.id
      name = req.body.name;
      heal = req.body.heal;
      price = req.body.price;
    }
    else{
      res.status(400).end();
      return;
    }

    //編集データ
    const putData: ItemsData = {
      'id': id,
      'name': name,
      'heal': heal,
      'price': price,
    }

    try {
      await ItemsService.create(putData);
      res.end();
    }
    catch (e) {
      if (e instanceof ConflictError) {
        res.status(409).end();
      }
      else{
        next(e);
      }
    }
  }

  //１件取得
  async get(req: Request, res :Response<ItemsData>, next :NextFunction){
    //パラメータの存在チェック
    if (!req.params.id) {
      res.status(400).end();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }

    try {
      const result = await ItemsService.getRecode(id);
      const resData: ItemsData = result;
      res.json(resData);
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        next(e);
      }
    }
  }

  //１件編集
  async put(req: Request, res :Response, next :NextFunction){
    //編集に必要なデータの確認
    if (!req.params.id || !req.body.name || !req.body.heal || !req.body.price) {
      res.status(400).end();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }

    let name: string;
    let heal: number;
    let price: number;
    //パラメータの型チェック
    if(typeGuard.stringCheck(req.body.name) &&
       typeGuard.numberCheck(req.body.heal) &&
       typeGuard.numberCheck(req.body.price)) {
      name = req.body.name;
      heal = req.body.heal;
      price = req.body.price;
    }
    else{
      res.status(400).end();
      return;
    }

    //編集データ
    const putData: ItemsData = {
      'id': id,
      'name': name,
      'heal': heal,
      'price': price,
    }

    try {
      await ItemsService.edit(putData);
      res.end();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        next(e);
      }
    }
  }

  //１件物理削除
  async delete(req: Request, res :Response, next :NextFunction){
    //パラメータの存在チェック
    if (!req.params.id) {
      res.status(400).end();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }

    try {
      await ItemsService.dataDelete(id);
      res.end();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        next(e);
      }
    }
  }
}
