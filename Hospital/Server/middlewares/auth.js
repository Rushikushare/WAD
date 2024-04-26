import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/UserSchema.js";

 export const  isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
     const token=req.cookies.adminToken;
     if(!token){
        return next(new ErrorHandler("Admin Not Authenticated",400));
     }
     const jwtsecret="rushi123";
     const  decoded=jwt.verify(token,jwtsecret);
     req.user=await User.findById(decoded.id);
     if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorised for this role`));
     }
  next();
 });

 export const  isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
       return next(new ErrorHandler("Patient Not Authenticated",400));
    } 
    const jwtsecret="rushi123";
    const  decoded=jwt.verify(token,jwtsecret);
    req.user=await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
       return next(new ErrorHandler(`${req.user.role} not authorised for this role`));
    }
   next();
});