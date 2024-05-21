const jwt = require("jsonwebtoken")
const express = require("express")
const User = require("../model/schema")
const All=require("../model/postschema")
const router=express.Router()
const authenticate=require("../middleware/authenticate")
const cookieParser=require('cookie-parser')
const { Schema } = require("mongoose")
 const server=express()
 server.use(cookieParser())
 
require('../db/conn')
 

//create new user

router.post('/reg',async(req,res)=>{
    // console.log(req.body) 
    // res.json({message: req.body})
    const {name,email,post,password,cpassword}=req.body

    try{
      const userExist=await User.findOne({email:email})
      if (userExist) {
          return res.status(422).json({error:"email exist"})
      }
      else if (password!=cpassword) {
        return res.status(422).json({error:"password not match"})
      }
      else{
        const user=new User({name,email,post,password,cpassword})
        await user.save();
 
       res.status(201).json({message:"registration successful"})
       
      }
      
    }catch(err){
        console.log(err)
    }
})


//login route

router.post('/login',async(req,res)=>{
   
    try{
        const {email,password}=req.body
         
        if (!email || !password) {
          return res.status(400).json({error:"please filled the data"})
        }

        const userLogin=await User.findOne({email:email})
       
        console.log(userLogin)

         if (userLogin) {
          const isMatch=await User.findOne({password:password})
          const token=await userLogin.generateAuthToken();
          console.log(token)

          res.cookie('jwtoken',token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
          })
         
          if (!isMatch) {
            res.status(400).json({error:"invalid credentials"})
          }else{
            res.json({message:"login successful"})
          }

         }else{
          res.status(400).json({error: "invalid credentials"})
         }
 
      }catch(err){
          console.log(err)
      }

})


router.get("/getdata",authenticate,(req,res)=>{
        console.log("h getdata ")
         
        res.send(req.rootUser)
         
    })

router.post("/post",authenticate,async(req,res)=>{
      try{
            const {name,message,amount}=req.body
           if (!name||!message ||!amount) {
              console.log("error in form")
            return res.json({error:"plzz fill the form"})
           }
           const userContact=await User.findOne({_id:req.userID})
            if (userContact) {
             const userMessage= await userContact.addMessage(name,message,amount)
              await userContact.save()
              res.status(201).json({message:"Expance added successfully"})
            }
          }catch(e){
            console.log(e)
            console.log("e")
          }
        })

        router.post("/all",authenticate,async(req,res)=>{
          const {name,message,amount}=req.body
          //const{photo}=req.file.originalname
          try{
            const user=new All({name,message,amount})
            await user.save();
     
           res.status(201).json({message:"Expance added successfully"})
          }catch(err){
        console.log(err)
        console.log("why")
    }
        })

          //view expence route

router.get('/allpost',(req,res)=>{
      All.find({},(err,All)=> {
        if (err) {
          res.send('some wrong')

        }
        res.json(All)
      })
         
        })

         //logout route

router.get("/logout",(req,res)=>{
      console.log("h logout ")
      res.clearCookie('jwtoken',{path:'/'})
      res.status(200).send('user Logout')
  })

module.exports=router