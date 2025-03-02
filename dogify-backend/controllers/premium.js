import express from "express";

export const savePremium =async (req,res) =>{
    try{
        const {premium,user} = req.body;
        const updatedUser = await User.findOneAndUpdate(
            {username:user},
            {ispremium:premium},
            {new:true}
        );
        return res.status(200).send("Pass status saved Successfully");
    }catch(err){
        return res.status(400).send(err.message);
    }
    
}