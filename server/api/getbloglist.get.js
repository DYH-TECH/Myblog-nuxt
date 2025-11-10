import { query } from "../utils/db";
export default defineEventHandler(async (event) => {
  const sql = "select* from blogs ORDER BY publish_date DESC";
  const res = await query(sql);
  return {
    code: 200,
    data: res,
  };
});
