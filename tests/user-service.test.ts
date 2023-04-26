import { getAllUsers, createUser } from "../src/services/user-service";
import { User } from "../src/interfaces/user";
import * as userModel from "../src/models/user-model";

const mockUser1: User = {
  id: 1,
  name: "user1",
  password: "password",
  money: 10,
  hp: 10,
};
const mockUser2: User = {
  id: 2,
  name: "user2",
  password: "password",
  money: 10,
  hp: 10,
};
const mockUsers: User[] = [mockUser1, mockUser2];
const mockUsersEmpty: User[] = [];

test("get all users", async () => {
  jest
    .spyOn(userModel, "getAllUsers")
    .mockResolvedValueOnce(mockUsers)
    .mockResolvedValueOnce(mockUsersEmpty);

  let conn: any;
  expect(await getAllUsers(conn)).toEqual(mockUsers);
  expect(await getAllUsers(conn)).toEqual(mockUsersEmpty);
});

test("create user", async () => {
  jest.spyOn(userModel, "createUser").mockImplementation(async (data: User) => {
    mockUsers.push({
      id: mockUsers.length + 1,
      name: data.name,
      password: data.password,
      money: data.money,
      hp: data.hp,
    });
    return mockUsers.length;
  });

  let conn: any;
  expect(
    await createUser(
      { name: "test", password: "test", money: 10, hp: 10 },
      conn
    )
  ).toEqual(mockUsers.length);
});

test("create user例2", async () => {
  jest
    .spyOn(userModel, "createUser")
    .mockResolvedValueOnce(1)
    .mockResolvedValueOnce(2);

  let conn: any;
  expect(
    await createUser(
      { name: "test1", password: "test", money: 10, hp: 10 },
      conn
    )
  ).toEqual(1);
  expect(
    await createUser(
      { name: "test2", password: "test", money: 10, hp: 10 },
      conn
    )
  ).toEqual(2);
});
