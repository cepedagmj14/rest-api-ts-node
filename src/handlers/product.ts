import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  const savedProduct = await Product.create(req.body);

  res.json({ data: savedProduct });
};
