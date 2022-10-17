import * as ItemsModel from "../models/itemsModel"
import {ItemsData} from "../interfaces/items";
import {DBError, NotFoundError, ConflictError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

//全件取得
export async function getList(): Promise<ItemsData[]> {
  const result = await ItemsModel.getList();
  return result;
}

//１件作成
export async function create(data: ItemsData): Promise<void> {
  try {
    await ItemsModel.create(data);
  }
  catch (e){
    if (e instanceof ConflictError) {
      throw new ConflictError();
    }
    throw e;
  }
}

//１件取得
export async function getRecode(id: number): Promise<ItemsData> {
  try {
    const result = await ItemsModel.getRecode(id);
    return result;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

//１件編集
export async function edit(data: ItemsData): Promise<void> {
  try {
   await ItemsModel.update(data);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

//１件物理削除
export async function dataDelete(id: number): Promise<void> {
  try {
    await ItemsModel.dataDelete(id);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}
