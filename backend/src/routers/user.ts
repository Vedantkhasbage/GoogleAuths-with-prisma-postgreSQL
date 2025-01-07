import express, { Router } from 'express';
export const userRouter = Router();
import z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
const pclient = new PrismaClient();
import { users } from '@prisma/client';
const JWT_KEY=process.env.JWT_KEY as string;


userRouter.post("/SignUp", async (req, res) => {


        const requiredDataTypes = z.object({
            email: z.string().min(5).max(100).email(),
            password: z.string().min(5).max(100)
        })

        const CheckDataTypes = requiredDataTypes.safeParse(req.body);

        if (!CheckDataTypes.success) {
            res.json({
                message: "Invalid"
            })
            return;
        }
    
    try {
        const { email, password } = req.body;

        const CheckAlreadyEmailPresentOrNot = await pclient.users.findUnique({
            where: {
                email: email
            }
        })

        if (CheckAlreadyEmailPresentOrNot) {
            res.status(401).send({
                message: "Email already users"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const AddUserToDB = await pclient.users.create({
            data: {
                email: email,
                password: hashedPassword,
                provider:"custom"
            }
        })
        res.json({
            message: "Signed Up success!!"
        })
    } catch (e) {
        res.status(500).send({
            message: "something went wrong!!"
        })
    }

})

userRouter.post("/GoogleSignUp",async(req,res)=>{
    const {email,googleID}=req.body;


      console.log("here reached");
    const CheckAlreadyEmailPresentOrNot = await pclient.users.findUnique({
        where: {
            email: email
        }
    })
    if (CheckAlreadyEmailPresentOrNot) {
        res.status(401).send({
            message: "Email already users"
        })
        return;
    }

    console.log("here also")

    console.log(req);

    const AddGoolgeUser=await pclient.users.create({
       data:{
        email:email,
        googleID:googleID,
        provider:"Google"
       }
    })

    if(AddGoolgeUser){
        res.status(200).send({
            message:"signed up!!!"
        })
    }
})


userRouter.post("/SignIn",async(req,res)=>{

    try {
        const requiredDataTypes = z.object({
            email: z.string().min(5).max(100).email(),
            password: z.string().min(5).max(100)
        })

        const CheckDataTypes = requiredDataTypes.safeParse(req.body);

        if (!CheckDataTypes.success) {
            res.status(401).send({
                message: "Invalid format"
            })
            return;
        }
    } catch (e) {
        res.status(401).send({
            message: "something went wrong!!"
        })
    }



    const {email,password}=req.body;

    const CheckUserWithEmail=await pclient.users.findUnique({
        where:{
            email:email
        }
    })
    console.log(CheckUserWithEmail);

    if(!CheckUserWithEmail){
         res.status(404).send({
            message:"User Not found!!"
         })
         return;
    }

    if (!CheckUserWithEmail.password) {
        res.status(404).send({
          message: "User signed up with Google, please use Google Sign-In!",
        });
        return;
      }

    const CheckPassword=await bcrypt.compare(password,CheckUserWithEmail.password);

    console.log(CheckPassword)
    
    if(!CheckPassword){
      res.status(404).send({
        message:"user not found!!"
    })
    return;
    }

    if(CheckPassword){
        const token=jwt.sign({
            userId:CheckUserWithEmail.id
        },JWT_KEY);
        res.cookie("uid",token,{
            httpOnly: true, // Prevent JavaScript access
            secure: false,
        });
        console.log(res)
        res.json({
            message:token
        })
    }
})

userRouter.post("/GoogleSignIn",async(req,res)=>{
 
    const {email,googleID}=req.body;

    const CheckUserWithEmail=await pclient.users.findUnique({
        where:{
            email:email
        }
    })

    if(!CheckUserWithEmail){
        res.status(404).send({
            message:"user not found!!"
    })
    return;
    }

    
    const CheckUserWithGoogleID=await pclient.users.findUnique({
        //@ts-ignore
        where:{
            googleID:googleID
        }
    })
    if(!CheckUserWithGoogleID){
        res.status(404).send({
            message:"user not found!!"
    })
    return;
    }
     
    res.status(200).send("success!!!");

})

userRouter.get("/finduser",async(req,res)=>{
       
    const {email}:any=req.query;

    if (!email) {
         res.status(400).send({
            message: "Email is required"
        });
    }

    const finduser=await pclient.users.findUnique({
        where:{
            email:email
        }
    })

    if(finduser){
        res.json({
            message:"found"
    })
    }
})



