import { Message } from "../models/MessageSchema.js";
import {catchAsyncErrors} from  "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        
      return next(new ErrorHandler("Please fill full form"));
    }
    try {
        await Message.create({ firstName, lastName, email, phone, message });
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while sending the message"
        });
    }
});


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  });