import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        
        const whitelist = [process.env.FRONTEND_URL];

        if(process.argv[2] === "--api") {
            whitelist.push(undefined);
        }
        
        // Permitir solicitudes desde localhost:5173
        if ( whitelist.includes(origin) ) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    } 
}