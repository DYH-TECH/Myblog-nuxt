import { query } from "../../utils/db";
import { verifyToken } from "../../utils/token";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const authorization = event.req.headers.authorization;
  const token = authorization?.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) {
    return {
      code: 401,
      message: "请先登录",
    };
  }
  const { blog_id, user_id, content } = body;
  const sql = "INSERT INTO comments (blog_id,user_id,content) VALUES (?,?,?)";
  const result = await query(sql, [blog_id, user_id, content]);
  if (result.affectedRows === 1) {
    return {
      code: 200,
      message: "评论成功",
    };
  } else {
    return {
      code: 500,
      message: "评论失败",
    };
  }
});
