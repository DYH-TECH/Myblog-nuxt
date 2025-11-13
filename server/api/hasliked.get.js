// server/api/hasliked.get.js
import { query } from "../utils/db";

export default defineEventHandler(async (event) => {
  const { blog_id, user_id } = getQuery(event);
  const sql =
    "SELECT COUNT(*) AS count FROM likes WHERE blog_id = ? AND user_id = ?";
  const [res] = await query(sql, [blog_id, user_id]);

  return {
    code: 200,
    liked: res.count > 0,
  };
});
