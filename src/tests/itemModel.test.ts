require('dotenv').config(); //.envに変わったから最初に読み込みが必要
import * as item from "../models/itemsModel";
import {ItemsData} from "../interfaces/items";

import {
  NotFoundError,
  ConflictError
} from "../interfaces/my-error";

const result_a :ItemsData = {
    'id': 1002,
    'name': "B Rank medicine",
    'heal': 50,
    'price': 400
  };

const result_b :ItemsData = {
  'id': 1003,
  'name': "C Rank medicine",
  'heal': 60,
  'price': 500
};

const edit_item_data: ItemsData = {
  'id': 1002,
  'name': "B Rank medicine",
  'heal': 55,
  'price': 450
}

test("create", async () => {
  try{
    await item.create(result_a);
    await item.create(result_b);
    console.log("create ok");
  }catch (e) {
    console.log("create bad");
    expect(e instanceof ConflictError).toBeTruthy();
  }
})

test("get Recode", async () => {
  const resultA = await item.getRecode(1002);
  console.log(resultA);

  try{
    await item.getRecode(1005);
  } catch (e) {
    console.log("get Recode bad");
    expect(e instanceof NotFoundError).toBeTruthy();
  }
})

test("update", async () => {
  try{
    await item.update(edit_item_data);
    console.log("update ok");
  }catch (e) {
    console.log("update bad");
    expect(e instanceof NotFoundError).toBeTruthy();
  }
})

test("delete", async () => {
  try{
    await item.dataDelete(1003);
    console.log("delete ok");
  }catch (e) {
    console.log("delete bad");
    expect(e instanceof NotFoundError).toBeTruthy();
  }
})
