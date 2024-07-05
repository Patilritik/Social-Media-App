import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("Mongo connected successfully....");
        })
        connection.on("error", (error) => {
            console.log("Error", error)
            process.exit();
        })
    } catch (error) {
        console.log("Mongo not connected with error ", error);
        process.exit();
    }
}