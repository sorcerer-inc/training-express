import { PoolConnection } from "mysql2/promise";
import { Player } from "../interfaces/player";
import { RowDataPacket, OkPacket } from "mysql2";
import { NotFoundError } from "../interfaces/my-error";

const selectPlayersIdAndName = async (dbConnection: PoolConnection): Promise<Player[]> => {
  const [rows] = await dbConnection.query<RowDataPacket[]>(
    "SELECT id,name FROM `players`;"
  );

  //DBから取得したデータをPlayerに変換
  const idAndName: Player[] = rows.map((row) => {
    return {
      id: row.id,
      name: row.name
    };
  });

  return idAndName;
};

const selectPlayerDataById = async (
  id: number,
  dbConnection: PoolConnection
): Promise<Player> => {
  const [rows] = await dbConnection.query<RowDataPacket[]>(
    "SELECT * FROM `players` WHERE id = ?;",
    id
  );

  let playerData: Player;
  if(rows[0] == null) throw new NotFoundError(`Data not found. id:${id}`); //データが存在しない場合

  //DBから取得したデータをPlayerに変換
  playerData = {
    id: rows[0].id,
    name: rows[0].name,
    hp: rows[0].hp,
    mp: rows[0].mp,
    money: rows[0].money
  };

  return playerData;
}

const insertPlayer = async (
  data: Player,
  dbConnection: PoolConnection
): Promise<number> => {
  const [rows] = await dbConnection.query<OkPacket>(
    "INSERT INTO `players` (`name`, `hp`, `mp`, `money`) VALUES (?,?,?,?)",
    [data.name, data.hp, data.mp, data.money]
  );

  return rows.insertId;
};

const updatePlayer = async (
  data: Player,
  dbConnection: PoolConnection
): Promise<void> => {

  //idがないならエラー
  if(data.id == null) throw new NotFoundError("id is undefined.");

  //Playerをstring[](`key(カラム名)` = value(値))に変換
  let updatingData: (string| number)[] = [];
  Object.keys(data).forEach((key) => {
    if(key == "id") return; //idはWHERE句で使いたいため配列には格納しない
    const tempData = data[key]; //型判定のために変数に代入
    if(tempData != null) {
      if(typeof tempData == "string") updatingData.push(`${key} = "${tempData}"`);
      if(typeof tempData == "number") updatingData.push(`${key} = "${tempData.toString()}"`);
    }
  });

  //UPDATE
  await dbConnection.query(
    "UPDATE `players` SET " + updatingData.join(", ") + " WHERE id = " + data.id
  );
};

export { selectPlayersIdAndName, selectPlayerDataById, insertPlayer, updatePlayer };