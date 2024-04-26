 import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
 import ErrorHandler from "../middlewares/errorMiddleware.js";

 import {User} from "../models/UserSchema.js";
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
 export const  patientRegister =catchAsyncErrors(async(req,res,next)=>{
    const { firstName, lastName, email, phone,dob, gender, password,role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
      let user = await User.findOne({email});
      if(user){
        return next(new ErrorHandler("User Already Registered"));
      }

      user = await User.create({firstName,lastName,email,phone,password,gender,dob,role});
      generateToken(user,"User Registered",200,res)
     
 });

 export const login =catchAsyncErrors(async(req,res,next)=>{
   
    const{email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all Detaills"));
    }

    if(password !==confirmPassword){
        return next(new ErrorHandler("Please Enter correct password"));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User Not Found"));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password"));
    }

    if(role !== user.role){
        return next(new ErrorHandler("User with this role Not Found "));
    }
    generateToken(user,"User Login Succesfully",200,res)

 });

 export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName,lastName, email, phone, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});



export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});



export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201).cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});


// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const { docAvatar } = req.files;

  if (!docAvatar || !docAvatar.mimetype) {
    return next(new ErrorHandler("Invalid Doctor Avatar!", 400));
  }

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

// Route to get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});