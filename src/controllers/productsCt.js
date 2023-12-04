import { ProductMd } from "../models/productMd.js";
import { isValidUUID } from "../../utils/isValidUUID.js";
import { validateProducts } from "../models/productVa.js";
const URL = process.env.PUBLIC_URL;
export class ProductCt {
  static async getAll(req, res) {
    const { name, catalog } = req.query;
    let isCatalog = [];
    // Verifica si catalog es "all" o no está presente
    if (catalog === "all") {
      return res
        .status(400)
        .json({ message: "Invalid or missing catalog parameter" });
    }

    if (catalog) {
      // Separa las categorías si se proporciona más de una
      isCatalog = catalog.split(",");
    }

    // Llama a la función getAll con los parámetros proporcionados
    const products = await ProductMd.getAll(name, isCatalog);

    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "Products not found" });
  }

  static async getById(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(400).json({ message: "Not valid Id" });
    const product = await ProductMd.getById(id);
    if (!product) return res.status(404).json({ message: "product not found" });
    res.status(200).json(product);
  }

  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(400).json({ message: "Not valid Id" });
    const result = await ProductMd.deleteOne(id);
    if (!result) {
      return res.status(404).json({ message: "product not found" });
    } else {
      res.status(200).json({ message: "product deleted" });
    }
  }
  static async addOne(req, res) {
    // console.log(req.file);
    const { name, price, descript, catalog, picture } = req.body;

    // Convertir catalog a un array si es una cadena
    const sanitisedCatalog = typeof catalog === "string" ? [catalog] : catalog;

    // const picture = `${URL}/${req.file.filename}`;
    const validateResult = validateProducts({
      name,
      price: Number(price),
      descript,
      catalog: sanitisedCatalog, // Utiliza el catalog convertido
      picture,
    });

    if (!validateResult.success) {
      console.log(validateResult.error);
      return res.status(422).json(validateResult.error);
    }

    try {
      await ProductMd.addOne({
        ...validateResult.data,
        picture,
      });
      res.status(201).json({ message: "product created" });
    } catch (error) {
      error.message.startsWith("Incorrect")
        ? res.status(400).json({ message: error.message })
        : res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) {
      return res.status(400).json({ message: "Not valid Id" });
    }
    const isProduct = await ProductMd.getById(id);
    if (!isProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    // const picture = `${URL}/${req.file.filename}`;
    const { name, price, descript, catalog, picture } = req.body;
    const sanitisedCatalog = typeof catalog === "string" ? [catalog] : catalog;
    const updateProduct = await ProductMd.updateOne(id, {
      name,
      price,
      descript,
      catalog: sanitisedCatalog,
      picture,
    });
    console.log(`soy yo en update${catalog}`);
    updateProduct
      ? res.status(201).json({ message: "product Updated" })
      : res.status(500).json({ message: "internal server error" });
  }
}
