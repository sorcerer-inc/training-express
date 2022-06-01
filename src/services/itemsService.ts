import * as ItemsModel from "../models/itemsModel"
import {ItemsData} from "../interfaces/items";
import {DBError, NotFoundError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

//全件取得
export async function getList(): Promise<{data : ItemsData[]}> {
  try {
    const result = await ItemsModel.getList();
    return {data: result.data};
  } catch (e) {
    throw new DBError("db error");
  }
}

//１件作成
export async function create(data: ItemsData): Promise<void> {
  try {
    await ItemsModel.create(data);
  } catch (e) {
    throw new DBError("db error");
  }
}

//１件取得
export async function getRecode(id: number): Promise<{data: ItemsData}> {
  try {
    const result = await ItemsModel.getRecode(id);
    return {data: result.data};
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
    else{
      throw new DBError("db error");
    }
  }
}

//１件編集
export async function edit(data: ItemsData): Promise<void> {
  try {
   await ItemsModel.update(data);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
  }
}

//１件物理削除
export async function dataDelete(id: number): Promise<void> {
  try {
    await ItemsModel.dataDelete(id);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError("not found");
    }
  }
}
