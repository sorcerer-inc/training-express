import {ItemsData} from "../interfaces/items";
import { db_pool } from "../helpers/DBHelper";
import {NotFoundError} from "../interfaces/my-error";
const log = require("log4js").getLogger("index");

//全件取得
export async function getList(): Promise<{data : ItemsData[]}> {
  const result: [any, any] = await db_pool
    .promise()
    .query("SELECT * FROM items;");

  let itemList : ItemsData[] = [];
  result[0].forEach((element: ItemsData) => {
    itemList.push({
      id: element.id,
      name: element.name,
      heal: element.heal,
      price: element.price
    })
  });

  return {data: itemList};
}

//１件作成
export async function create(data: ItemsData): Promise<void> {
  await db_pool.promise()
    .query(
      "INSERT INTO items (id, name, heal, price) values (?, ?, ?, ?)",
      [data.id, data.name, data.heal, data.price]
    );
}

//１件取得
export async function getRecode(id: number): Promise<{data : ItemsData}> {
  const result: [any, any] = await db_pool
    .promise()
    .query("SELECT * FROM items WHERE id = ?", [id]);

  if(result[0].length == 0){
    throw new NotFoundError("not found");
  }

  let itemList: ItemsData = {id: 0, name: '', heal: 0, price: 0};
  result[0].forEach((element: ItemsData) => {
    itemList.id = element.id;
    itemList.name = element.name;
    itemList.heal = element.heal;
    itemList.price = element.price;
  });

  return {data: itemList};
}

//１件編集
export async function update(data: ItemsData): Promise<void>{
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
export async function dataDelete(id: number): Promise<void>{
  const result: [any, any] = await db_pool
    .promise()
    .query(
      "DELETE FROM items WHERE id = ?", [id]
    );

  if(result[0].affectedRows == 0){
    throw new NotFoundError("not found");
  }
}
