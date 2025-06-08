import express from "express";
import 'dotenv/config';
import { connectDB } from "./config/db";
import router from "./router";

const app = express();

// Conexión a base de datos
connectDB();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/auth', router);

export default app;
