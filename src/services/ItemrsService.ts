import * as DBconnectionHelper from "../helpers/DBHelper";
import mysql, {ResultSetHeader} from "mysql2/promise";
const log = require('log4js').getLogger("index");

export async function getList(): Promise<any> {
  // ローカル以外であれば管理DBのテーブルを読む
  // ローカルならprojectsテーブルを読む
  const connection = await DBconnectionHelper.db_connection;
  try {
    const results = await connection.query<any[]>('SELECT * from projects');
    return {data: results};
  } catch (e) {
    throw e;
  } finally {
    await connection.end();
  }
}

export async function post(data: any): Promise<{ id: any }> {
  // ヘルパー関数を呼び出す
  const connection = await DBconnectionHelper.db_connection;
  log.info(data);
  try {
    const result = await connection.query<ResultSetHeader>("INSERT INTO items (id, name, heal, price) values (?, ?)", [data.id, data.name, data.heal, data.price]);
    await connection.commit();
    return {id: result};
  } catch (e) {
    throw(e);
  } finally {
    await connection.end();
  }
}

export async function get($id: any){
  // ヘルパー関数を呼び出す
  const connection = await DBconnectionHelper.db_connection;

  try {
    const result = await connection.query("SELECT * FROM items WHERE id = ?", [$id]);
    return {data: result};
  } catch (e) {
    throw(e);
  } finally {
    await connection.end();
  }
}

export async function put($data: any){
  // ヘルパー関数を呼び出す
  const connection = await DBconnectionHelper.db_connection;

  try {
    const result = await connection.query("UPDATE items SET name = ?, heal = ?, price = ?  WHERE id = ?", [$data.name, $data.heal, $data.price, $data.id]);
    return {data: result};
  } catch (e) {
    throw(e);
  } finally {
    await connection.end();
  }
}

export async function dataDelete($id: any){
  // ヘルパー関数を呼び出す
  const connection = await DBconnectionHelper.db_connection;

  try {
    const result = await connection.query("DELETE FROM items WHERE id = ?", [$id]);
    return {data: result};
  } catch (e) {
    throw(e);
  } finally {
    await connection.end();
  }

}
