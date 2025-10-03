import mongoose from "mongoose";
export type  UserRole="user" | "admin";
import type { userTask } from "./Task";

export type userType={
    name:string;
    email:string;
    password:string;
    role:UserRole
}

const userSchema=new mongoose.Schema({
       name:{type:String,require:true},
       email:{type:String,require:true},
       password:{type:String,require:true},
       role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        require:true
       }
})


const User=mongoose.model<userType>("User",userSchema);

export default User;
