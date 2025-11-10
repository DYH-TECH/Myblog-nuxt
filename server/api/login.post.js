import { query } from "../utils/db.js";
import { generateToken } from "../utils/token.js";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  const sql = `select * from users where username = ? and password = ?`;
  const res = await query(sql, [username, password]);
  if (res.length > 0) {
    console.log("登录成功", res[0]);
    const token = generateToken({ username: res[0].username }, "24h");
    return {
      code: 200,
      msg: "登录成功",
      data: {
        token: token,
        username: res[0].username,
      },
    };
  } else {
    return {
      code: 400,
      msg: "用户名或密码错误",
      data: {},
    };
  }
});
