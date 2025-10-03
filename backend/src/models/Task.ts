
import mongoose, { Schema } from "mongoose";

export type userTask={
    title:string,
    description:string,
    userId:string;
}

const taskSchema=new mongoose.Schema({
     title:{
      type:String,
      require:true,
     },
     description:{
        type:String,
        require:true,
     },
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
     }
})

const Task=mongoose.model<userTask>("Task",taskSchema);

export default Task;

