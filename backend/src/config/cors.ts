import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes desde localhost:5173
        if ( origin ===  process.env.FRONTEND_URL ) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    } 
}