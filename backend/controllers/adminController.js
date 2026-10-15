import { Router } from "express";
import { approveProduct, approveUser, getUnapprovedProducts, getUnapprovedUsers } from "../routes/adminRoutes.js";

const adminRoutes = Router()

adminRoutes.patch("/approve-user/:id", approveUser);
adminRoutes.get("/unapproved-users", getUnapprovedUsers);
adminRoutes.get("/unapproved-products", getUnapprovedProducts);
adminRoutes.patch("/approve-product/:id", approveProduct);

export default adminRoutes;