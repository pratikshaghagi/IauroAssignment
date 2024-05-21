const mongoose=require("mongoose");

const jwt = require("jsonwebtoken")
const express = require("express")
const cookieParser=require('cookie-parser')
 const server=express()
 server.use(cookieParser())

const userSchema=new mongoose.Schema({

    name:{type:String,
        required: true
        // unique:true,
         
         },
         email:
             {type:String,
             required:true
         // unique:true,
         
         }, 
         password:
             {type:String,
             required:true
         // unique:true,
         
         }, 
         cpassword:
             {type:String,
             required:true
         // unique:true,
         
         },
         messages:[
             {
                name:{type:String,
                    required: true
                     
                     },
                     message:{type:String,
                        required: true
                         
                         },
                         amount:{type:String,
                            required: true
                             
                             },
                           
             }
         ],
         tokens:[
             {
                 token:{
                    type:String,
                    required:true
                 }
             }
         ]
}

)

userSchema.methods.generateAuthToken=async function(){
    try{
let token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
this.tokens=this.tokens.concat({token: token})
await this.save()
return token;
    }catch(e){
        console.log(e)
    }
}

userSchema.methods.addMessage= async function(name,message,amount){
    try{
          this.messages=this.messages.concat({name,message,amount})
          await this.save()
          return this.messages  
    }catch(e){
        console.log(e)
    }
}

const User= new mongoose.model("User",userSchema)

module.exports=User;