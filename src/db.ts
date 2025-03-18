
import {model,Schema} from "mongoose";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://satwik2529:DSKMHB456@cluster0.jlcjy.mongodb.net/");
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String  
})
 export const UserModel= model("User",UserSchema);
 const ContentSchema= new Schema({
    tittle:String,
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
    

 })
 const LinkSchema= new Schema({
   hash:String,
 userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,unique:true}
    

 })
 export const ContentModel=model("Content",ContentSchema);
 export const LinkModel=model("Links",LinkSchema);