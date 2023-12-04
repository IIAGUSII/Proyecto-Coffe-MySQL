import { Router } from "express";
export const router = Router();
import { isAuth } from "../../middleware/session.js";
import { ProductCt } from "../controllers/productsCt.js";
import { uploadFile } from "../../utils/handleStorage.js";
router.get("/", ProductCt.getAll);
router.get("/:id", ProductCt.getById);
router.delete("/:id", isAuth, ProductCt.deleteOne);
router.post("/", isAuth, ProductCt.addOne);
router.patch("/:id", isAuth, ProductCt.updateOne);
// uploadFile.single("picture")
