import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll(/* {
      order: [["id", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    } */);
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "producto no encontrado" });
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // validacion en el handler
  //   await check("name")
  //     .notEmpty()
  //     .withMessage("El nombre del producto no puede ir vacio")
  //     .run(req);

  //   await check("price")
  //     .isNumeric()
  //     .withMessage("Valor no valido")
  //     .custom((value) => value > 0)
  //     .withMessage("Precio no valido")
  //     .notEmpty()
  //     .withMessage("El precio del producto no puede ir vacio")
  //     .run(req);

  //   let errors = validationResult(req);
  //   console.log("errors check", errors);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  try {
    const savedProduct = await Product.create(req.body);
    res.json({ data: savedProduct });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    // 1 primero ver si existe
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "producto no encontrado" });
    }

    // 2 actualizar
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
