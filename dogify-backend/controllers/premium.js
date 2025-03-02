import express from "express";
import { User } from "../Models/User.js";
export const savePremium =async (req,res) =>{
    try{
        const {premium,user} = req.body;
        console.log(req.body);
        const updatedUser = await User.findOneAndUpdate(
            {username:user},
            {ispremium:premium},
            {new:true,runValidators: true}
        );
        return res.status(200).send("Pass status saved Successfully");
    }catch(err){
        return res.status(400).send(err.message);
    }
    
}