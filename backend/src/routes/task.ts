import { Router, Request, Response } from "express";
import Task from "../models/Task";
import {verifyToken,canEditBlog} from "../middleware/auth";
const router = Router();

router.post("/createTask", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;
    const task = await Task.findOne({ title });
    if (task) {
      return res.status(404).json({ message: "task already Created" });
    }

    const newTask = await Task.create({
      title,
      description,
      userId,
    });
    await newTask.save();

    return res
      .status(200)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong", error: error.message });
  }
});

router.get("/userBlog",verifyToken,async(req:Request,res:Response)=>{
      try {
       const userId=req.userId;
       let blog=await Task.find({userId:userId});
       if(!blog){
        return res.status(404).json({message:"blog not found"});
       }
       return res.status(200).json(blog);
        
      } catch (error) {
        return res.status(500).json({message:"Something went wrong"});
      }
    
})
router.delete("/:id",verifyToken,async(req:Request,res:Response)=>{
      try {
          const task=await Task.findByIdAndDelete(req.params.id);
          if(!task){
            return res.status(404).json({message:"task not found"});   
          }
        return res.status(200).json({message:"task is deleted"});
        
      } catch (error) {
        
      }
      
});
router.get("/:id",verifyToken,async(req:Request,res:Response)=>{
  try {
   const blog=await Task.findById(req.params.id);
   if(!blog)return res.status(404).json({message:"Not found"});
   return res.json(blog);
    
  } catch (error) {
    return res.status(500).json({message:"Somthing went wrong"});
  }
})

router.put("/:id",verifyToken,canEditBlog,async(req:Request,res:Response)=>{
          try {
            const {title,description}=req.body;
          const updatedTask=await Task.findByIdAndUpdate(req.params.id,
            {title,description},{new:true,runValidators:true});
            if(!updatedTask){
              return res.status(404).json({message:"task not updated"});
            }
            return res.status(200).json({message:"Blog Updated Successfully",updatedTask})
          } catch (error) {
            return res.status(500).json({message:"Something went wrong"});
          }
})

router.get("/",async(req:Request,res:Response)=>{
      try {
        const tasks=await Task.find().populate("userId","name role");
        if(!tasks){
            return res.status(404).json({message:"Task Not Found"});
        }
        return res.status(200).json(tasks);
        
      } catch (error) {
        return res.status(500).json({message:"Internal Server error"})
      }

})




export default router;

