import { Router } from "express";
export const router = Router();

import { UserCt } from "../controllers/usersCt.js";

router.get("/", UserCt.getAll); //privado para un admin
router.post("/register", UserCt.register);
router.post("/login", UserCt.login);
