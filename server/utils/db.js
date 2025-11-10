import mysql from "mysql2/promise";

// 创建数据库连接池
const pool = mysql.createPool({
  host: "localhost", // 数据库主机
  user: "root", // 数据库用户名
  password: "admin123", // 改成你自己的密码
  database: "blog_system", // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 封装通用查询方法
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// 导出连接池（可选）
export default pool;
