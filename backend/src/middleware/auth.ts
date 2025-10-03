import { NextFunction, Request,Response } from "express";

import jwt from "jsonwebtoken";
import Task from "../models/Task";
import { rmSync } from "fs";


interface Jwtpayload{
    userId:string;
    role:"user" | "admin"
}

declare global{
    namespace Express{
        interface Request{
            userId:string;
            role:"user" | "admin";
        }
    }
}

const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }

    try {
        const decoded=jwt.verify(token,process.env.SCREATKEY as string) as Jwtpayload;
        req.userId = decoded.userId; 
        req.role=decoded.role;
        
        next();
    } catch (error) {
        return res.status(401).json({message:"unauthorized"});
    }
}
const canEditBlog=async(req:Request,res:Response,next:NextFunction)=>{
       try {
          const blog=await Task.findById(req.params.id);
          if(!blog){
            return res.status(404).json({message:"Blog not Found"});
          }
          if(req.role === "admin"){
            return next();
          }

          if(blog.userId.toString() == req.userId){
            return next();
          }
          return res.status(403).json({message:"NOT Authorized"});       } catch (error) {
        return res.status(500).json({message:"server error"})
       }
}
export  {verifyToken,canEditBlog};