import { tokenVerify } from "../utils/handleJwt.js";
export const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  const isValidToken = await tokenVerify(token);
  isValidToken ? next() : res.status(401).json({ message: "Invalid token" });
};
