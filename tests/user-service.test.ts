import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  login,
  buyItem,
} from "../src/services/UserService";

import {
  NotFoundError,
  AuthError,
  NotEnoughError,
  LimitExceededError,
} from "../src/interfaces/MyError";

import { User, UserLogin } from "../src/interfaces/User";
import { UserItemInput, UserItemOutput } from "../src/interfaces/UserItem";

import * as db_user from "../src/models/UserModel";
import * as db_users_items from "../src/models/UsersItemsModel";

//jest.useFakeTimers();

const mock_data_user_1: User = {
  id: 1,
  name: "user1",
  password: "password",
  money: 10,
  hp: 10,
};
const mock_data_user_2: User = {
  id: 2,
  name: "user2",
  password: "password",
  money: 10,
  hp: 10,
};
const mock_data_all_users: User[] = [mock_data_user_1, mock_data_user_2];
const mock_data_all_users_empty: User[] = [];

const mock_data_user_item_1: UserItemOutput = {
  id: 1,
  user_id: 1,
  item_id: 1,
  num: 10,
};
const mock_data_user_items: UserItemOutput[] = [mock_data_user_item_1];

// new Promise((resolve, reject) => {
//   resolve();
// });

test("get all users", async () => {
  jest
    .spyOn(db_user, "getAllUsers")
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          resolve(mock_data_all_users);
        })
    )
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          resolve(mock_data_all_users_empty);
        })
    );

  expect(await getAllUsers()).toEqual(mock_data_all_users);
  expect(await getAllUsers()).toEqual(mock_data_all_users_empty);
});

test("create user", async () => {
  jest.spyOn(db_user, "createUser").mockImplementation((data: User) => {
    mock_data_all_users.push({
      id: mock_data_all_users.length + 1,
      name: data.name,
      password: data.password,
      money: data.money,
      hp: data.hp,
    });
    return new Promise((resolve, reject) => {
      resolve(mock_data_all_users.length);
    });
  });

  expect(
    await createUser({ name: "test", password: "test", money: 10, hp: 10 })
  ).toEqual(mock_data_all_users.length);
});

test("get user", async () => {
  jest.spyOn(db_user, "getUser").mockImplementation((id: number) => {
    return new Promise((resolve, reject) => {
      resolve(mock_data_all_users[id]);
    });
  });

  expect(await getUser(0)).toEqual(mock_data_user_1);
  expect(await getUser(1)).toEqual(mock_data_user_2);

  // user id存在しない
  try {
    await getUser(100);
  } catch (e) {
    expect(e instanceof NotFoundError).toBeTruthy();
  }
});

test("update user", async () => {
  jest.spyOn(db_user, "updateUser").mockImplementation((data: User) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  });

  expect(
    await updateUser({
      id: 1,
      name: "test",
      password: "test",
      money: 10,
      hp: 10,
    })
  ).toBeTruthy();
});

test("login user", async () => {
  jest.spyOn(db_user, "getUser").mockImplementation((id: number) => {
    return new Promise((resolve, reject) => {
      resolve(mock_data_all_users[id]);
    });
  });

  expect(
    await login({
      id: mock_data_all_users[0].id!,
      password: mock_data_all_users[0].password!,
    })
  ).toBeTruthy();

  // wrong password
  try {
    expect(
      await login({
        id: mock_data_all_users[0].id!,
        password: "",
      })
    ).toBeTruthy();
  } catch (e) {
    expect(e instanceof AuthError).toBeTruthy();
  }
});

test("buy item", async () => {
  jest
    .spyOn(db_users_items, "getUserItem")
    .mockImplementation((data: UserItemInput) => {
      return new Promise((resolve, reject) => {
        resolve(mock_data_user_items[data.id - 1]);
      });
    });

  jest.spyOn(db_user, "getUser").mockImplementation((id: number) => {
    return new Promise((resolve, reject) => {
      resolve(mock_data_all_users[id]);
    });
  });

  // 1. 成功
  expect(await buyItem({ id: 1, item_id: 1, num: 1 }));
  // 2. 存在しない
  try {
    expect(await buyItem({ id: 10, item_id: 1, num: 1 }));
  } catch (e) {
    expect(e instanceof NotFoundError).toBeTruthy();
  }
  // 3. item num　上限
  mock_data_user_items[0].num = 20;
  try {
    expect(await buyItem({ id: 1, item_id: 1, num: 1 }));
  } catch (e) {
    expect(e instanceof LimitExceededError).toBeTruthy();
  }

  // 4. user money not enough
  mock_data_user_items[0].num = 0;
  try {
    expect(await buyItem({ id: 1, item_id: 1, num: 20 }));
  } catch (e) {
    expect(e instanceof NotEnoughError).toBeTruthy();
  }
});
