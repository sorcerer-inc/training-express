import * as Items from "../services/itemsService";
import * as item from "../models/itemsModel";
import {ItemsData} from "../interfaces/items";

import {
  DBError,
  NotFoundError,
  AuthError,
  NotEnoughError,
  LimitExceededError,
} from "../interfaces/my-error";

const result_a :ItemsData = {
    'id': 1003,
    'name': "B Rank medicine",
    'heal': 50,
    'price': 400
  };

const result_b :ItemsData = {
  'id': 1004,
  'name': "C Rank medicine",
  'heal': 60,
  'price': 500
};

const mock_item_data: ItemsData = {
  'id': 1005,
  'name': "D Rank medicine",
  'heal': 70,
  'price': 600
}

const edit_item_data: ItemsData = {
  'id': 1004,
  'name': "C Rank medicine",
  'heal': 55,
  'price': 550
}

const mock_data_all_items: any = [result_a, result_b];
const mock_data_all_items_empty: any = [];

test("get Recode", async () => {
  jest.spyOn(item, "getRecode").mockImplementation( (id:number) => {
    return mock_data_all_items[id];
  });

  const resultA = await Items.getRecode(1003);
  const resultB = await Items.getRecode(1004);
  expect(resultA).toEqual(result_a);
  expect(resultB).toEqual(result_b);

  try{
    await Items.getRecode(1005);
  } catch (e) {
    expect(e instanceof NotFoundError).toBeTruthy();
  }
})

test("create", async () => {
  try{
    await item.create(mock_item_data);
    console.log("create ok");
  }catch (e) {
    expect(e instanceof DBError).toBeTruthy();
  }
})

test("update", async () => {
  try{
    await item.update(edit_item_data);
    console.log("update ok");
  }catch (e) {
    expect(e instanceof DBError).toBeTruthy();
  }
})

test("delete", async () => {
  try{
    await item.dataDelete(1003);
    console.log("delete ok");
  }catch (e) {
    expect(e instanceof DBError).toBeTruthy();
  }
})
