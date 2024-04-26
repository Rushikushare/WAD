import express from "express";
import { config } from "dotenv";


import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import DbConnection from "./database/DbConnection.js";
import messageRouter from "./Router/messageRouter.js";
import  { errorMiddleware } from  "./middlewares/errorMiddleware.js"
import  UserRouter from "./Router/userRouter.js";
import  appointmentRouter from "./Router/appointmentRouter.js";
const App = express();

config({path:"./config/config.env"});


 
 const allowedOrigins = ["http://localhost:5173","http://localhost:5174"];

 // CORS options
 const corsOptions = {
   origin: function (origin, callback) {
     // Check if the origin is allowed or if it is undefined (which can happen with some requests)
     if (!origin || allowedOrigins.includes(origin)) {
       callback(null, true);
     } else {
       callback(new Error('Not allowed by CORS'));
     }
   },
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
 };
 
 // Use CORS middleware
 App.use(cors(corsOptions));


App.use(cookieParser());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

App.use("/api/v1/message", messageRouter); 
App.use("/api/v1/user",UserRouter);
App.use("/api/v1/appointment",appointmentRouter)
DbConnection();


App.use(errorMiddleware);
export default App;
