import { connection } from "../../db_config.js";
export class UserMd {
  static async getAll() {
    const [users, _info] = await connection.query(`SELECT * FROM users`);
    return users.length ? users : null;
  }
  static async register(user) {
    const { name, email, password } = user;
    const result = await connection.query(
      `INSERT INTO users (name, email, password) VALUES (?,?,?)`,
      [name, email, password]
    );
    return result ? result : null;
  }
  static async getUserByEmail(email) {
    const [user, _info] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return user.length ? user : null;
  }
}
