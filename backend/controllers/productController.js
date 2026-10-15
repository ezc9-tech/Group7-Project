import { Router } from "express";
import { createProduct } from "../routes/productRoutes.js";

const productRoutes = Router()

productRoutes.post("/", createProduct);

export default productRoutes;