import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/RegisterBackend.js";
import handleSignin from "./controllers/SignBackend.js";
import profile from "./controllers/ProfileBackend.js";

// import {image,handleImageUrl} from "./controllers/ImageBackend.js";
import {image,handleImageUrl} from "./controllers/ImageBackend.js";
import {mongoose} from "mongoose";



process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString : process.env.DATABASE_URL,
//       ssl: true,
//     }
//   });

const app=express();

// const saltRounds=10;
// const pass="@n$hika";
// const otherpass="answer";
// bcrypt.hash(pass,saltRounds,(err,hash)=>{
//     console.log(hash);
// })

// bcrypt.compare(pass,"$2b$10$2l8zw3.z2IloWy6NTU1K/eN54HjZeNQC2IdipDhv2Ynw2X7CeMLue",(err,res)=>{
//     console.log("pass",res);
// })
// bcrypt.compare(otherpass,"$2b$10$2l8zw3.z2IloWy6NTU1K/eN54HjZeNQC2IdipDhv2Ynw2X7CeMLue",(err,res)=>{
//     console.log("otherpass",res);
// })

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/faceRecognizer");
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please check your data name is not specified"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    noOfEntries:{
        type:Number
    },
    joined:{
        type:Date
    }
});

const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    hashPassword:{
        type:String,
        required:[true,"Provide the hashed password"]
    }
})

const User=new mongoose.model("user",userSchema);
const Login=new mongoose.model("login",loginSchema);
app.get("/",(req,res)=>{
    res.send("Success");
})
app.post("/signin",(req,res)=>{
    handleSignin(req,res,bcrypt,User,Login);
})

app.post("/register",(req,res)=>{
    handleRegister(req,res,bcrypt,User,Login);
})
app.get("/profile/:id",(req,res)=>{
    profile(req,res,User,Login);
})
app.put("/image",(req,res)=>{
   image(req,res,User,Login)
})
app.post("/imageUrl",(req,res)=>{
    handleImageUrl(req,res)
})

app.listen(process.env.PORT|| 3000,()=>{
    console.log("server is running");
});