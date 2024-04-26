import mongoose from "mongoose";
import { config } from "dotenv";
config(); 

const DbConnection = () => {
    mongoose.connect("mongodb+srv://rushi:kushare@cluster0.f1eiog3.mongodb.net", {
        dbName:"HOSPITAL",
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("DB Not Connected:", err.message);
    });
};

export default DbConnection;
