import { query } from "../utils/db";

export default defineEventHandler(async () => {
  const result = await query("SELECT 1 + 1 AS sum");
  return { message: "数据库连接正常 ✅", result };
});
