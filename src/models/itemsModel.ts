import {ItemsData} from "../interfaces/items";
import { db_pool } from "../helpers/DBHelper";
import {NotFoundError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

//全件取得
export async function getList() {
  const [rows, fields] = await db_pool
    .promise()
    .query("SELECT * FROM items;");
  return rows;
}

//１件作成
export async function create(data: ItemsData) {
  await db_pool.promise()
    .query(
      "INSERT INTO items (id, name, heal, price) values (?, ?, ?, ?)",
      [data.id, data.name, data.heal, data.price]
    );
}

//１件取得
export async function getRecode(id: number) {
  const result: [any, any] = await db_pool
    .promise()
    .query("SELECT * FROM items WHERE id = ?", [id]);

  if(result[0].length == 0){
    throw new NotFoundError("not found");
  }

  return result[0];
}

//１件編集
export async function update(data: ItemsData) {
  const result: [any, any] = await db_pool
    .promise()
    .query(
      "UPDATE items SET name = ?, heal = ?, price = ?  WHERE id = ?",
      [data.name, data.heal, data.price, data.id]
    );

  if(result[0].affectedRows == 0){
    throw new NotFoundError("not found");
  }
}

//１件物理削除
export async function dataDelete(id: number){
  const result: [any, any] = await db_pool
    .promise()
    .query(
      "DELETE FROM items WHERE id = ?", [id]
    );

  if(result[0].affectedRows == 0){
    throw new NotFoundError("not found");
  }
}
