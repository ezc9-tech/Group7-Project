import { Router } from "express";
import { approveUser } from "../routes/adminRoutes.js";

const adminRoutes = Router()

adminRoutes.post("/approve-user/:id", approveUser);

export default adminRoutes;