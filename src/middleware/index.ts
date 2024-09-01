import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErros = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);
  console.log("errors check", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
