import * as userModel from "../models/user-model";
import * as usersItemsModel from "../models/users-items-model";
import {
  NotFoundError,
  AuthError,
  NotEnoughError,
  LimitExceededError,
} from "../interfaces/my-error";

import { User, UserLogin } from "../interfaces/user";
import { UserItemInput, UserItemOutput } from "../interfaces/user-item";

const MAX_ITEMS_NUM = 20;

const getAllUsers = async () => {
  const result = await userModel.getAllUsers();
  return result;
};

const createUser = async (data: User) => {
  const result: number = await userModel.createUser(data);
  return result;
};

const getUser = async (data: number) => {
  try {
    const result = await userModel.getUser(data);
    return result;
  } catch (e) {
    if (e instanceof NotFoundError) throw new NotFoundError();
    else throw e;
  }
};

const updateUser = async (data: User) => {
  try {
    const result: boolean = await userModel.updateUser(data);

    if (result) {
      return result;
    } else {
      throw new NotFoundError();
    }
  } catch (e) {
    if (e instanceof NotFoundError) throw new NotFoundError();
    else throw e;
  }
};

const login = async (data: UserLogin) => {
  try {
    const result: User = await userModel.getUser(data.id);

    // password check
    if (result && result.password == data.password) {
      return result;
    } else {
      throw new AuthError();
    }
  } catch (e) {
    if (e instanceof AuthError) throw new AuthError();
    else throw e;
  }
};

const buyItem = async (data: UserItemInput) => {
  //logic
  try {
    //1. get user_item data
    let user_item = await usersItemsModel.getUserItem(data);
    let user = await userModel.getUser(data.id);
    let item_price = 1; //TODO

    //2. if limit?
    if (user_item.num + data.num > MAX_ITEMS_NUM) {
      throw new LimitExceededError();
    }
    //3. if money?
    let cost = item_price * data.num;
    if (cost > user.money!) {
      throw new NotEnoughError();
    }

    //3.1 items += num;
    user_item.num += data.num;
    usersItemsModel.updateUserItem({
      id: data.id,
      item_id: data.item_id,
      num: user_item.num,
    });
    //3.2 money -= cost;
    user.money! -= cost;
    userModel.updateUser({
      id: data.id,
      name: user.name,
      password: user.password,
      money: user.money,
      hp: user.hp,
    });
  } catch (e) {
    if (e instanceof NotEnoughError) throw new NotEnoughError();
    else if (e instanceof NotFoundError) throw new NotFoundError();
    else if (e instanceof LimitExceededError) throw new LimitExceededError();
    else throw e;
  }
};

const useItem = async (data: UserItemInput) => {
  //logic
  try {
    //1. get user_item data
    let user_item = await usersItemsModel.getUserItem(data);
    let user = await userModel.getUser(data.id);
    let item_heal = 1; //TODO

    //3. if enough?
    if (data.num > user_item.num) {
      throw new NotEnoughError();
    }

    //3.1 items -= num;
    user_item.num += data.num;
    //3.2 hp += heal;
    user.hp! += item_heal * data.num;
  } catch (e) {
    if (e instanceof NotEnoughError) throw new NotEnoughError();
    else if (e instanceof NotFoundError) throw new NotFoundError();
    else throw e;
  }
};

export {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  login,
  buyItem,
  useItem,
};
// curl -X "GET" "http://localhost:3000/users" -H "accept: application/json"
