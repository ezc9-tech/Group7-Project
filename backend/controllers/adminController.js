import { Router } from "express";
import { approveUser, getUnapprovedUsers } from "../routes/adminRoutes.js";

const adminRoutes = Router()

adminRoutes.patch("/approve-user/:id", approveUser);
adminRoutes.get("/unapproved-users", getUnapprovedUsers);

export default adminRoutes;