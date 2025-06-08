import dotenv from "dotenv";
dotenv.config();

import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.bgBlue.white.italic(`Servidor corriendo en el puerto: ${port}`));
});

type product = {
    id: number,
    price: number,
    name: string
}

let product: product = {
    id: 1,
    price: 100,
    name: "Laptop"
}
