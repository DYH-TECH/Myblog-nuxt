import { query } from "../utils/db";
import { verifyToken } from "../utils/token";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const authorization = event.req.headers.authorization;
  const token = authorization?.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload)
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "未登录" })
    );
  const { user_id, blog_id } = body; // 获取用户id和博客id
  const users = await query(
    "SELECT * FROM likes WHERE user_id = ? AND blog_id = ?",
    [user_id, blog_id]
  );
  if (users.length === 0) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "未点赞" })
    );
  }
  const sql = "DELETE  FROM likes WHERE user_id = ? AND blog_id = ?";
  const result = await query(sql, [user_id, blog_id]);
  if (result.affectedRows === 1) {
    return { code: 200, success: true, message: "取消点赞成功" };
  } else {
    return { code: 500, success: false, message: "取消点赞失败" };
  }
});
