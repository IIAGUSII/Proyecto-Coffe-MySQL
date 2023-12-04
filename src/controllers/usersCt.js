import { UserMd } from "../models/userMd.js";
import { encryptPassword, checkPassword } from "../../utils/handlePassword.js";
import { tokenSign, tokenVerify } from "../../utils/handleJWT.js";

export class UserCt {
  static async getAll(req, res) {
    const users = await UserMd.getAll();
    users
      ? res.status(200).json(users)
      : res.status(404).json({ message: "Users Not Found" });
  }
  static async register(req, res) {
    const { name, email, password } = req.body;
    const securedPass = await encryptPassword(password);
    const newUser = {
      name,
      email,
      password: securedPass,
    };
    const userCreated = await UserMd.register(newUser);
    userCreated
      ? res.status(201).json({ message: "User created" })
      : res.status(500).json({ message: "Internal Server Error" });
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const isUser = await UserMd.getUserByEmail(email);
    if (!isUser) return res.status(401).json({ message: "Incorrect email" });
    const isValidPassword = await checkPassword(password, isUser[0].password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Incorrect or password" });
    const tokenPayload = {
      name: isUser[0].name,
      email: isUser[0].email,
    };
    const jwt = await tokenSign(tokenPayload, 1000 * 60 * 60 * 24 * 365);

    res.status(200).json({ message: "Login successful", token: jwt });
  }
}
