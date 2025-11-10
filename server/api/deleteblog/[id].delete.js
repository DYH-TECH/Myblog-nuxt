import { query } from "../../utils/db";
import { verifyToken } from "../../utils/token";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "缺少参数",
    });
  }
  const blog_id = id;
  const authHeader = event.req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload.username) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
      statusMessage: "Token 无效",
    });
  }

  const user = await query(`SELECT user_id FROM users WHERE username=?`, [
    payload.username,
  ]);
  const user_id = user[0].user_id;
  if (!user_id) {
    throw createError({
      statusCode: 401,
      statusMessage: "用户不存在",
    });
  }
  //删除博客,确保用户只能删除自己的博客
  const sql = `DELETE FROM blogs WHERE blog_id=? AND author_id=?`;
  const res = await query(sql, [blog_id, user_id]);
  if (res.affectedRows > 0) {
    return {
      code: 200,
      success: true,
      message: "删除成功",
    };
  } else {
    return {
      code: 401,
      message: "删除失败",
    };
  }
});
