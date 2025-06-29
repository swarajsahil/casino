import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/cookies.js";
import ErrorHandler from "../middlewares/error.js";

export const register=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        // Validate the request body
        if (!username || !email || !password) {
            return next(new ErrorHandler("All fields are required", 400));
        }
    const userData=await User.findOne({email});
    if(userData)
    {
        return next(new ErrorHandler("Already register, login",400));
    }
        const hassedPassword=await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hassedPassword
        })
        sendCookie(userData, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
      const { email, password } = req?.body;
  
      const user = await User?.findOne({ email }).select("+password");
  
      if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch)
        return next(new ErrorHandler("Invalid Email or Password", 400));
  
      sendCookie(user, res, `Welcome back, ${user.username}`, 200);
    } catch (error) {
      next(error);
    }
  };
export const getMyProfile=(req,res,next)=>{
    try {
        res.json({
            user:req.user
        })
    } catch (error) {
        next(error);
    }
}
export const logout = (req, res, next) => {
    try {
      // Clear the token cookie
      res
        .cookie("token", "", {
          httpOnly: true,
          expires: new Date(0), // Expire the cookie immediately
          sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
          secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .status(200)
        .json({
          success: true,
          message: "Logged out successfully",
        });
    } catch (error) {
      next(error);
    }
  };
