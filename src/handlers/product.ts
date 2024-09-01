import { Request, Response } from "express";
import Product from "../models/Product.model";
import { check, validationResult } from "express-validator";

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
