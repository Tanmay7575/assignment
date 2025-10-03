import { Router,Request,Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'
import   jwt  from "jsonwebtoken";
import {verifyToken} from "../middleware/auth";
const router=Router();

router.post("/register",async(req:Request,res:Response)=>{
   try {
      const {email,name,password,role}=req.body;
    const user=await User.findOne({email:email});
   
    if(user){
        return res.status(404).json({message:"user already exist"})
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await User.create({
         name:name,
         email:email,
         password:hashedPassword,
         role:role
    });
       await newUser.save();

 const token = jwt.sign(
    {userId:newUser._id,role:newUser.role},
     process.env.SCREATKEY as string,
     {expiresIn:"1d"}
  )
  res.cookie("auth_token",token,{
     httpOnly:true,
     secure:process.env.NODE_ENV === "production",
      maxAge:86400000,
      sameSite:"none"
  })
    return res.status(200).json({message:"User registerd successfully",
        token
    });    
   } catch (error) {
      return res.status(500).json({message:"Server Error"})
   }
   
})

router.post("/login",async(req:Request,res:Response)=>{
   try {
      const {email,password,role}=req.body;
     const user=await User.findOne({email:email,role:role});
     if(!user){
        return res.status(404).json({message:"user not found"});
     }
     const hashedPassword=await bcrypt.compare(password,user.password);
     if(!hashedPassword){
        return res.status(404).json({message:"Invalid credentials"});
     }
     const secret= process.env.SCREATKEY as string;
     const token=jwt.sign(
        {userId:user._id,role:user.role},
       secret,
        {expiresIn:"1d"}
     )

     res.cookie("auth_token",token,{
        httpOnly:true,
         secure:process.env.NODE_ENV === "production",
         maxAge:86400000,
         sameSite:"none"
     });

     return res.status(200).json({message:"loged in successfully",token});
      
   } catch (error) {
      return res.status(500).json("Server Error")
   }
     
})

router.post("/logout",async(req:Request,res:Response)=>{
      res.cookie("auth_token",{
         expires:new Date(0),
      })   
      return res.send();
})

router.get("/",async(req,res)=>{
      try {
         const users=await User.find({});
         if(!users){
            return res.status(404).json({message:"user not found"});
         }
         return res.status(200).json(users);
      } catch (error) {
         return res.status(500).json({message:"something went wrong"});
      }
})

router.get("/validate_token",verifyToken,(req: Request,res: Response)=>{
     res.status(200).send({userId: req.userId,role:req.role})
});

router.get("/me",verifyToken,async(req:Request,res:Response)=>{
try {
   const user=await User.findById(req.userId).select("-password");
   if(!user){
      return res.status(404).json({message:"User Not found"});
   }
   return res.status(200).json(user);
   
} catch (error) {
   return res.status(500).json({message:"Server Error"})
}
})


export default router;