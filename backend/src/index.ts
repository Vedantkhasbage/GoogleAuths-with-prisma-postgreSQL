import { PrismaClient } from "@prisma/client";
const pclient=new PrismaClient();
import express from 'express';
import { userRouter } from "./routers/user";
const app=express();
import cors from 'cors';

app.use(express.json());
app.use(cors());
app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("server started!!!");
});
