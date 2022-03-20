import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/RegisterBackend.js";
import handleSignin from "./controllers/SignBackend.js";
import profile from "./controllers/ProfileBackend.js";
// import {image,handleImageUrl} from "./controllers/ImageBackend.js";
import {image} from "./controllers/ImageBackend.js";

const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'postgresql-defined-44133',
      ssl:true
    }
  });

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

app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Success");
})
app.post("/signin",(req,res)=>{
    handleSignin(req,res,db,bcrypt)
})

app.post("/register",(req,res)=>{
    handleRegister(req,res,db,bcrypt)
})
app.get("/profile/:id",(req,res)=>{
    profile(req,res,db)
})
app.put("/image",(req,res)=>{
   image(req,res,db)
})
app.post("/imageUrl",(req,res)=>{
    handleImageUrl(req,res)
})

app.listen(process.env.PORT|| 3000);