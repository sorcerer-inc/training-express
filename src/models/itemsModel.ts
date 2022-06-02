import {ItemsData} from "../interfaces/items";
import { db_pool } from "../helpers/DBHelper";
import {NotFoundError, ConflictError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

const ER_DUP_ENTRY = 1062; //mysqlのPRIMARY KEY重複時に出るエラーコード

//全件取得
export async function getList(): Promise<ItemsData[]> {
  const result: [any, any] = await db_pool
    .promise()
    .query("SELECT * FROM items;");

  const itemList : ItemsData[] = result[0].map((element: ItemsData) => {
    return {
      'id': element.id,
      'name': element.name,
      'heal': element.heal,
      'price': element.price
    }
  })

  return itemList;
}

//１件作成
export async function create(data: ItemsData): Promise<void> {

  try {
    await db_pool.promise()
      .query(
        "INSERT INTO items (id, name, heal, price) values (?, ?, ?, ?)",
        [data.id, data.name, data.heal, data.price]
      );
  }
  catch (e: any) {
    if(e.errno == ER_DUP_ENTRY){
      throw new ConflictError();
    }
    else{
      throw e;
    }
  }
}

//１件取得
export async function getRecode(id: number): Promise<ItemsData> {
  const result: [any, any] = await db_pool
    .promise()
    .query("SELECT * FROM items WHERE id = ?", [id]);

  if(result[0].length == 0){
    throw new NotFoundError();
  }

  const itemList : ItemsData = result[0].map((element: ItemsData) => {
    return {
      'id': element.id,
      'name': element.name,
      'heal': element.heal,
      'price': element.price
    }
  })

  return itemList;
}

//１件編集
export async function update(data: ItemsData): Promise<void>{
  const result: [any, any] = await db_pool
    .promise()
    .query(
      "UPDATE items SET name = ?, heal = ?, price = ?  WHERE id = ?",
      [data.name, data.heal, data.price, data.id]
    );

  if(result[0].affectedRows === 0){
    throw new NotFoundError();
  }
}

//１件物理削除
export async function dataDelete(id: number): Promise<void>{
  const result: [any, any] = await db_pool
    .promise()
    .query(
      "DELETE FROM items WHERE id = ?", [id]
    );

  if(result[0].affectedRows === 0){
    throw new NotFoundError();
  }
}
