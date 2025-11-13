import { query } from "../utils/db";
import { verifyToken } from "../utils/token";

export default defineEventHandler(async (event) => {
  const authorization = event.req.headers.authorization;
  const token = authorization?.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) {
    return sendError(
      createError({
        statuscode: 401,
        statusMessage: "未登录",
      })
    );
  }
  const { user_id } = getQuery(event);
  const sql = `SELECT b.* FROM likes l JOIN blogs b ON l.blog_id = b.blog_id WHERE l.user_id = ? ORDER BY l.like_id DESC`;
  const result = await query(sql, [user_id]);
  if (result.length === 0) {
    return {
      code: 500,
      massage: "未找到点赞博客",
      data: [],
    };
  } else {
    return {
      code: 200,
      data: result,
    };
  }
});
