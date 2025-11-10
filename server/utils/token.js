import jwt from "jsonwebtoken";

// secret 建议放在 .env 文件里
const SECRET_KEY = "my_super_secret_key";

/**
 * 生成 JWT token
 * @param {Object} payload - 需要存入 token 的信息，比如 { username: 'abc' }
 * @param {string|number} expiresIn - 过期时间，例如 '1h' 或 3600
 * @returns {string} token
 */
export function generateToken(payload, expiresIn = "24h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

/**
 * 验证 token
 * @param {string} token - 待验证的 token
 * @returns {Object|boolean} payload 或 false
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}
