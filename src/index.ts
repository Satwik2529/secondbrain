import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import cors from "cors";
const app=express(); 
app.use(express.json());
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
app.use(cors());
app.post("/api/v1/signup",async (req,res)=>{
    //zod validation,hsh pasword
    const username=req.body.username;
    const password=req.body.password;
    try{
        await UserModel.create({
            username:username,
            password:password
        })
        res.json({
            message:"user signed up"
        })
    }
    catch(e){
        res.status(411).json({
            message:"user already exists"
        })
    }
   console.log("hii")
})
app.post("/api/v1/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token =jwt.sign({
            id: existingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
   
    
})
app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    const link=req.body.link;
    const type=req.body.type;
    const tittle=req.body.tittle;
   await ContentModel.create({
        link,
        type,
        tittle,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
     res.json({
        message:"content added"
    })
    
})
app.get("/api/v1/content",userMiddleware,async (req,res)=>{
    //@ts-ignore
  const userId=req.userId;
  const content=await ContentModel.find({
    userId:userId
  }).populate("userId","username")

  res.json({
    content
  })


    
})
app.delete("/api/v1/content",userMiddleware,async (req,res)=>{
const contentId=req.body.contentId;
await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId:userId
})
res.json({
    message:"deleted"
})

    
})
app.post("/api/v1/brain/share",userMiddleware, async (req,res)=>{
const share=req.body.share;
if(share){
    const existingLink=await LinkModel.findOne({
        //@ts-ignore
        userId:req.userId
    })
    if(existingLink){
        res.json({
         hash:existingLink.hash
        })
        
        return
    }
    const hash=random(10);
   await LinkModel.create({
        //@ts-ignore
        userId:req.userId,
        hash:hash
    })
    res.json({
     hash
    })
    
}
else {
   await LinkModel.deleteOne({
        //@ts-ignore
        userId:req.userId,
    })
    res.json({
        message:"remove link"
    })
    
}
    
})
 

app.get("/api/v1/brain/:shareLink",async (req,res)=>{

const hash=req.params.shareLink;
const link=await LinkModel.findOne({
    hash
});

if(!link){
    res.status(411).json({
        MESSAGE:"SORRY INCORRECT INPUT  "
    })
    return;
}
const content =await ContentModel.find({
    userId:link.userId
})
const user=await UserModel.findOne({
 
    _id: link.userId
})
if(!user){
    res.status(411).json({
        MESSAGE:"SORRY INCORRECT INPUT mostly dont happen "
    })
    return;
}
res.json({
    username:user.username,
    content:content
})
    
})
app.listen(3000);