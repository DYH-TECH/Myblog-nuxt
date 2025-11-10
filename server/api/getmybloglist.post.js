import { query } from "../utils/db";
import { verifyToken } from "../utils/token";
export default defineEventHandler(async (event) => {
  const authHeader = await event.req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  const payload = await verifyToken(token);
  if (!payload) {
    return {
      code: 401,
      data: "未登录",
    };
  }
  const sql = "SELECT user_id FROM users WHERE username=?";
  const sql2 =
    "SELECT * FROM blogs WHERE author_id=? ORDER BY publish_date DESC";
  const rows = await query(sql, [payload.username]);

  // console.log("1" + rows[0].user_id);

  if (!rows || rows.length === 0) {
    return {
      code: 400,
      data: "用户不存在",
    };
  }

  const user_id = rows[0].user_id;
  const result = await query(sql2, [user_id]);
  if (result && result.length > 0) {
    return {
      code: 200,
      data: result,
    };
  } else {
    return {
      code: 400,
      data: "获取失败",
    };
  }
});
