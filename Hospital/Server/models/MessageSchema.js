import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const MessageSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name must Contain At Least Three Characters"],
        minLength: [3, "First Name must Contain At Least Three Characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name must Contain At Least Three Characters"],
        minLength: [3, "Last Name must Contain At Least Three Characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.isEmail,
            message: "Enter a valid email address"
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: (value) => validator.isMobilePhone(value, "any", { strictMode: false }),
            message: "Enter a valid phone number"
        }
    },
    message: {
        type: String,
        required: [true, "Message must contain at least 10 characters"],
        minLength: [10, "Message must contain at least 10 characters"]
    }
});

 export const Message = mongoose.model("Message", MessageSchema);

export default Message;
