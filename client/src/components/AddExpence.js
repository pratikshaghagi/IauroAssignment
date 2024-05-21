import React,{useEffect,useState} from 'react'

const AddExpence = (props) => {
     
const [userData,setUserData]=useState({name:"",message:"",amount:""})

const userContact=async()=>{
    try{
     const res=await fetch('/getdata',{
    method:"GET",
    headers: {"Content-Type":"application/json"},
    
})

const data= await res.json();
console.log("pk")
 console.log(data)
 
 setUserData({...userData,name:data.name})
if (!res.status===200) {
     console.log("tufd")
    const error=new Error(res.error)
    throw error
    
}

    }catch(err){
        console.log("err")
         
        console.log(err)
        
        //navigate("/login")
    }
}

useEffect(() => {
    userContact();
}, [])

const handleInputs=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setUserData({...userData,[name]:value})
   
}



const contactForm=async(e)=>{
    e.preventDefault()

    const {name,message,amount}=userData
     
const res=await fetch('/all',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,message,amount
    })
})
const data=await res.json()
console.log(data)
 if (!data) {
     console.log("message not send")
 }else{
     alert("Expence is added")
     setUserData({...userData,message:"",amount:""})
     console.log("setit")
     console.log(userData)
     // props.func(userData)
      
 }
 
}

    return (
         <>
           
<div className="containercre">
    <form method="POST" className="reg-form" id="reg-form">
        
          
    <div className="row">  
        {/* <p>
            <label>Name</label>
            <input className="in" type="text" name="name"  value={userData.name} readOnly
            onChange={handleInputs}
            placeholder="enter name" required/>
        </p> */}

        <p>
        <label style={{ fontWeight: 'bold', fontSize: '28px'}}>Welcome</label>
        <span className="in" style={{ fontWeight: 'bold', marginLeft: '5px', fontSize: '28px' }}> {userData.name}</span>
        </p>

        <p>
        <label>Expense for</label>  
        <br/>
        
            <input className="cre" type="text" name="message"  value={userData.message}
            onChange={handleInputs}
            placeholder="enter expence" required/>
        </p> 
        <p>
        <label>Expense amount</label>  
        <br/>
            
            <input className="cre" type="text" name="amount"  value={userData.amount}
            onChange={handleInputs}
            placeholder="enter amount" required/>
        </p> 
    </div>
     
    <div className="po">
    <button type="submit" onClick={contactForm} id="Post" >Add</button>
    </div>
    </form>
</div>
         </>
    )
}

export default AddExpence
