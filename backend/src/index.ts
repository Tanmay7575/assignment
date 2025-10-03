import express ,{Request,Response}from "express";
import cors from 'cors';
import registerUser from "./routes/user";
import taskOpration from "./routes/task";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import  mongoose  from "mongoose";
const app=express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 



app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}));




app.use("/api/user",registerUser);
app.use("/api/task",taskOpration);

app.get("/",async(req:Request,res:Response)=>{
    res.json({message:"connected"});
})

app.listen(8080,()=>{
    console.log("server is coonected on http://localhost:8080");
});