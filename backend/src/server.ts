import express from "express";
import 'dotenv/config';
import { connectDB } from "./config/db";
import router from "./router";
import cors from "cors";
import { corsConfig } from "./config/cors";
// Conexión a base de datos
connectDB();
const app = express();

//cors
app.use(cors(corsConfig));

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/auth', router);

export default app;
