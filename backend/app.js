import express from "express";
import authRoutes from "./controllers/authenticationController.js";
import cors from 'cors';
import adminRoutes from "./controllers/adminController.js";

const app = express();

//Middleware
app.use(express.json())
app.use(cors())

//Routes
app.use('/api', authRoutes)
app.use('/api/admin', adminRoutes)

export default app;