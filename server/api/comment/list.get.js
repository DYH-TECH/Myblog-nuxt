import { query } from "../../utils/db";
import { verifyToken } from "../../utils/token";
export default defineEventHandler(async (event) => {
  const { blog_id } = await getQuery(event);
  const sql = `
    SELECT c.comment_id, c.content, c.user_id, u.username
    FROM comments c
    JOIN users u ON c.user_id = u.user_id
    WHERE c.blog_id = ?
    ORDER BY c.created_at ASC
  `;
  const result = await query(sql, [blog_id]);
  if (result.length > 0) {
    return {
      code: 200,
      data: result,
    };
  } else {
    return {
      code: 400,
      message: "没有评论",
      data: [],
    };
  }
});
