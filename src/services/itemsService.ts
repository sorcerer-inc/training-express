import * as ItemsModel from "../models/itemsModel"
import {ItemsData} from "../interfaces/items";
import {DBError, NotFoundError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

//全件取得
export async function getList() {
  try {
    const result = await ItemsModel.getList();
    return result;
  } catch (e) {
    throw new DBError("db error");
  }
}

//１件作成
export async function create(data: ItemsData) {
  try {
    await ItemsModel.create(data);
  } catch (e) {
    throw new DBError("db error");
  }
}

//１件取得
export async function getRecode(id: number) {
  try {
    const result = await ItemsModel.getRecode(id);
    return result;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
  }
}

//１件編集
export async function edit(data: ItemsData) {
  try {
   await ItemsModel.update(data);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
  }
}

//１件物理削除
export async function dataDelete(id: number){
  try {
    await ItemsModel.dataDelete(id);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
  }
}
