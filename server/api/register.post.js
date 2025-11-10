import { query } from "../utils/db";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  console.log(username, password);
  const res = await query(`SELECT * FROM users WHERE username = '${username}'`);
  if (res.length > 0) {
    return {
      status: 400,
      message: "用户名已存在",
    };
  } else {
    await query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
    );
    return {
      status: 200,
      message: "注册成功",
    };
  }
});
