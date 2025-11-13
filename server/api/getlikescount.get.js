import { query } from "../utils/db";

export default defineEventHandler(async (event) => {
  const blog_id = getQuery(event).blog_id;
  const sql = "SELECT COUNT(*) AS like_count FROM likes WHERE blog_id = ?";
  const [res] = await query(sql, [blog_id]);
  return { code: 200, data: res.like_count };
});
