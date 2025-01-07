import { PrismaClient } from "@prisma/client";
const pclient=new PrismaClient();
import express from 'express';
import { userRouter } from "./routers/user";
const app=express();
import cors from 'cors';

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
}));app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("server started!!!");
});
