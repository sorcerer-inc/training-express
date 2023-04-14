import { dbPool } from "../helpers/db-helper";
import { UserItemInput, UserItemOutput } from "../interfaces/user-item";
import { NotFoundError } from "../interfaces/my-error";

const getUserItem = async (data: UserItemInput): Promise<UserItemOutput> => {
  const [rows] = await dbPool.query(
    "SELECT * FROM `users_items` WHERE `user_id` = ? && `item_id` =?",
    [data.id, data.item_id]
  );
  if ((rows as any)[0]) return (rows as any)[0];
  else throw new NotFoundError();
};

const updateUserItem = async (data: UserItemInput): Promise<boolean> => {
  const [rows] = await dbPool.query(
    "UPDATE `users_items` SET  `num`= ? WHERE `id` = ? && `item_id` = ?",
    [data.num, data.id, data.item_id]
  );
  return (rows as any).affectedRows != 0;
};

export { getUserItem, updateUserItem };
