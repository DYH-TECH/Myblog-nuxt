import { query } from "../utils/db";
import { verifyToken } from "../utils/token";
export default defineEventHandler(async (event) => {
  const authHeader = await event.req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  const payload = await verifyToken(token);
  if (!payload) {
    return {
      code: 401,
      data: "未登录",
    };
  }
  const { user_id, blog_id } = await readBody(event);

  try {
    const res = await query(
      "INSERT INTO `likes` (`user_id`,`blog_id`) VALUES (?,?)",
      [user_id, blog_id]
    );
    return {
      code: 200,
      data: res,
      message: "点赞成功",
    };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { code: 400, message: "你已经点过赞啦！" };
    }
    console.error(error);
    return { code: 500, message: "点赞失败" };
  }
});
