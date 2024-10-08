import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErros } from "./middleware";
const router = Router();
// routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErros,
  getProductsById
);

router.post(
  "/",

  // validacion en el router
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio"),
  handleInputErros,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio"),
  body("availability")
    .isBoolean()
    .withMessage("valor para disponibilidad no valido"),
  handleInputErros,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErros,
  updateAvailability
);

router.delete(
  "/:id",

  param("id").isInt().withMessage("ID no valido"),
  handleInputErros,
  deleteProduct
);

export default router;
