import {ItemsData} from "../interfaces/items";
import { db_pool } from "../helpers/DBHelper";

export async function getList() {
  const [rows, fields] = await db_pool
    .promise()
    .query("SELECT * FROM items;");
  return rows;
}

export async function create(data: ItemsData) {
  await db_pool.promise()
    .query(
      "INSERT INTO items (id, name, heal, price) values (?, ?, ?, ?)",
      [data.id, data.name, data.heal, data.price]
    );
}

export async function getRecode(id: number) {
  const [row, fields] = await db_pool
    .promise()
    .query("SELECT * FROM items WHERE id = ?", [id]);

  return row;
}

export async function update(data: ItemsData) {
  await db_pool.promise()
    .query(
      "UPDATE items SET name = ?, heal = ?, price = ?  WHERE id = ?",
      [data.name, data.heal, data.price, data.id]
    );
}

export async function dataDelete(id: number) {
  await db_pool.promise()
    .query(
      "DELETE FROM items WHERE id = ?", [id]
    );
}
