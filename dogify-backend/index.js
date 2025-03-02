import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { FRONTEND_URL } from './utils/constants.js';
import { login } from './Controllers/login.js';
import { User } from "./Models/User.js";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import { userData } from './Controllers/userData.js';
import http from 'http';
import { sendOtp } from './Controllers/sendOtp.js';
import { updatePassword } from './Controllers/updatePassword.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        credentials:true,
        origin:[
            FRONTEND_URL
        ],
    })
)

const server = http.createServer(app);

server.listen(PORT, () => {console.log("server is listening")});
const mongodbConnectLink=process.env.MONGODB_CONNECTION_LINK;
mongoose.connect(mongodbConnectLink)
    .then(() => console.log("connected with mongoDB database."))
    .catch((err) => console.log("Not able to connect: ", err));

app.get("/", (req,res) => {
    res.send("Server is on!")
})

app.post("/login", login);

app.get("/authuser", (req,res) => {
    const token = req.cookies.USER_LOGGED_IN;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err){
                res.status(403).send("Invalid token");
            }
            const decodedToken = jwt.decode(token, {complete: true});

            res.status(200).json({ _id: decodedToken.payload._id });
        })
    } else {
        res.status(401).send("No token Found.")
    }
});

app.get("/signup/users", (req,res) => {
    User.find()
    .then(users =>{
        res.status(200).json({users});
    })
    .catch(err => {
        res.status(500).send("Server error");
    })
})

app.post("/add/user", async (req,res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).send("Bad request.");
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                username:username,
                password:hashedPassword
            })
            user.save()
            .then(() => {
                res.status(201).send("User created.")
            })
            .catch(err => {
                res.status(500).send("Problem in saving the user.")
            })
        }
    }catch(err){
        res.status(500).send("Server error.")
    }
})

app.get("/logout", (req,res) => {
    res.clearCookie('USER_LOGGED_IN', {
        httpOnly: true,
        secure: true
    });
    res.status(200).send("Logged out successfully.")
})

app.post("/userdata", userData);

app.post("/sendOTP", sendOtp);

app.post("/updatePassword", updatePassword);








