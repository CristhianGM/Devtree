import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.log(colors.bgRed.white("Error: MONGO_URI no está definida en el archivo .env"));
        process.exit(1);
    }

    try {
        const { connection } = await mongoose.connect(mongoURI);
        const url = `${connection.host}:${connection.port}`;
        console.log(colors.bgGreen.bold.yellow(`MongoDB conectado en ${url}`));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(colors.bgRed.white(error.message));
        } else {
            console.log(colors.bgRed.white("Error desconocido al conectar con MongoDB"));
        }
        process.exit(1);
    }
};
