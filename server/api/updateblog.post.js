import { verifyToken } from "../utils/token.js";
import { query } from "../utils/db.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const authHeader = event.req.headers.authorization || "";
  const token = authHeader.split(" ")[1]; // 拿到 Bearer 后面的 token
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "未授权" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: "未授权" });
  }
  //console.log(payload);
  // 根据 username 查出用户 id
  const user = await query("SELECT user_id FROM users WHERE username = ?", [
    payload.username,
  ]);

  const userId = user[0]?.user_id;
  // console.log(userId);
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "用户不存在" });
  }

  const { author, title, content, summary } = body;

  const sql = `
    INSERT INTO blogs (author,author_id, title, summary, content, publish_date)
    VALUES (?,?, ?, ?, ?, NOW())
  `;
  const result = await query(sql, [author, userId, title, summary, content]);
  if (result.affectedRows > 0) {
    return {
      code: 200,
      message: "Blog created successfully",
    };
  } else {
    return {
      code: 500,
      message: "Failed to create blog",
    };
  }
});
