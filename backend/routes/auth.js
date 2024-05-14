import express from 'express'
import {User} from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { upload } from '../middleware/fileUploads.js';
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "daminithakur296@gmail.com",
      pass: "ldhn nurn whca qisz",
    },
  });
 

const authRouter = express.Router();
authRouter.post('/send-mail',async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Receiver  email not found"});
        }
        const mailoption={
            from:"daminithakur296@gmail.com",
            to:email,
            text:`click on this link for reset password.http://localhost:3000/setpassword/${email}`,
        };
        //send email
        await transporter.sendMail(mailoption)
        res.status(200).json({message:"email send successfully"})
    } catch(error){
        
        res.status(500).json({message:"failed to send email",error:error.message})
    }
});
authRouter.post('/reset-password',async(req,res)=>{
    const {email,newpassword}=req.body;
    try{
    const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not exists"})
        }
        const saltvalue=10
        const hashpassword=await bcrypt.hash(newpassword,saltvalue)
        user.password=hashpassword;
        await user.save();
        res.status(200).json({message:"password is reset successfully"})
    } catch(err){
        console.log(err,"error during the rest-password");
    }
})
authRouter.post ('/change-password',async(req,res)=>{
    const{email,newpassword}=req.body;
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'user  not exists'})
        }
        const saltvalue=10
        const hashpassword=await bcrypt.hash(newpassword,saltvalue)
        user.password=hashpassword;
        await user.save();
        res.status(202).json({message:'password is change successfully'})
    }catch(err){
        console.log(err,"error during the change-password")
    }
})

authRouter.post("/signup",async(req,res)=>{
    try{
        const{userName,email,password,
        confirmpassword
    }=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'user already exsists'});
        }
        const saltvalue=10
        const hashpassword=await bcrypt.hash(password,saltvalue)
        const user=new User({
            userName,
            email,
            password:hashpassword,

        });

        await user.save();
        res.status(201).json({message:"user created successfully"});
   }catch(err){
    console.log(err);
   }
   
   
});
authRouter.post ("/login",async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All field are required"});

    }
    const existingUser=await User.findOne({email});
    if(!existingUser){
        return res.status(400).json({message:"user not exists"});
    }
    const matchPaaword=await bcrypt.compare
    (password,existingUser.password);
    if(!matchPaaword){
        return res.status(400).json({message:"Invalid password"});
    }
    const token=jwt.sign(
        {userId:existingUser._id},
        process.env.JWT_SECRET_KEY
    );
    const userId=existingUser._id
    res.status(200).json({message:"login successfully",token, userId});
});
//profile get API
authRouter.get("/profile/:id",async (req,res)=>{
    const userId=req.params.id;
    try{
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user profile retrieved successfully",user});
    } catch(err){
        console.log(err,"hjkkk")
    }
})
//update profile API 
 authRouter.put("/profile/:id", async (req,res)=>{
    const userId=req.params.id
    try{
        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const {userName,email,country,state,zipcode}=req.body;
        user.userName=userName;
        user.country=country;
        user.zipcode=zipcode;
        user.email=email;
        user.state=state;
        await user.save();
        res.status(200).json({message:"user is successfully updated",user})

    }catch(err){

        console.log(err,"ghkl")
    }
 })
 authRouter.patch("/profile/:id", upload.fields([
    { name: 'profilephoto', maxCount: 1 },
    { name: 'backgroundphoto', maxCount: 1 }
]), async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Handling file paths
        const profilePhoto = req.files['profilephoto'] ? req.files['profilephoto'][0].path : user.profilephoto;
        const backgroundPhoto = req.files['backgroundphoto'] ? req.files['backgroundphoto'][0].path : user.backgroundphoto;

        // Update user details
        user.profilephoto = profilePhoto;
        user.backgroundphoto = backgroundPhoto;
        await user.save();

        res.status(200).json({ message: "User is successfully updated", user: user });
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ message: "Failed to update user" });
    }
});
export default authRouter



