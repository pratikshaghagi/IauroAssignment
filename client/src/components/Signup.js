import React, {useState} from 'react'
 import {useNavigate} from 'react-router-dom'
 import '../style/regi.css'
const Signup = () => {
const navigate=useNavigate()
    const [user,setUser]=useState({
        name:"",email:"",password:"", cpassword:""
    })
    let name,value;
const handleInputs=(e)=>{
    console.log(e)
    name=e.target.name
    value=e.target.value
    setUser({...user,[name]:value})

    console.log(value)
     
}

const PostData=async (e)=>{
e.preventDefault()
const {name ,email ,post ,password , cpassword}=user;

const res=await fetch("/reg",{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify({
        name ,email ,password , cpassword
    })
})
const data=await res.json()

if (res.status===422 || !data) {
    window.alert("invalid")
    console.log("invalid")
}
else{
    window.alert("Registration successful")
    console.log("succes")
     
    navigate("/login")
}
}

    return (
         
        <>
          
<div className="containerreg">
    <form method="POST" className="reg-form" id="reg-form">
        <h1 className="tit">Registration</h1>
         
        <div className="row">
        <p><label>Username</label>
            <input   className="in"  type="text" name="name" value={user.name} 
        onChange={handleInputs} placeholder="enter name" required/></p>
         
    
        <p><label>Email</label><input className="in"  type="email" name="email" id="email"  value={user.email} 
            onChange={handleInputs} placeholder="xyz@gmail.com"/> </p>
 
        <p><label>Password</label> <input className="in"  type="password" name="password"  value={user.password} 
            onChange={handleInputs} id="password"/></p>
        <p><label>Confirm Password</label> <input className="in"  type="cpassword" name="cpassword" value={user.cpassword} 
            onChange={handleInputs} id="cpassword"/></p>
        </div>
        <div className="bu"> 
        <input type="submit" className="re" name="signup" value="Register" id="Signup" onClick={PostData}/>
        </div>
    </form>
</div>
 
        </>
         
    )
}

export default Signup