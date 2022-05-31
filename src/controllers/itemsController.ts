import {Response, Request, NextFunction} from "express";
import * as Items from "../services/itemsService"
import {ItemsData} from "../interfaces/items";
import {DBError, NotFoundError} from "../interfaces/my-error";
import * as typeGuard from "../helpers/typeGuard";
const log = require('log4js').getLogger("index");


export class ItemsController {
  //全件取得
  async getList(req: Request, res :Response){
    try {
      const result = await Items.getList();
      res.status(200);
      res.json(result);
    }
    catch (e) {
      throw e;
    }
  }

  //１件作成
  async post(req: Request, res :Response){

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
      await Items.create(putData);
      res.status(200).end();
    }
    catch (e) {
      throw e;
    }
  }


  //１件取得
  async get(req: Request, res :Response){
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
      const result = await Items.getRecode(id);
      res.status(200);
      res.json(result);
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        throw e;
      }
    }
  }

  //１件編集
  async put(req: Request, res :Response){

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
      await Items.edit(putData);
      res.status(200).end();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        throw e;
      }
    }
  }

  //１件物理削除
  async delete(req: Request, res :Response){
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
      await Items.dataDelete(id);
      res.status(200).end();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).end();
      }
      else{
        throw e;
      }
    }
  }
}
