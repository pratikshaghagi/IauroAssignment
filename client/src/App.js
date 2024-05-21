 import React, { createContext, useReducer } from 'react'
 import {Route,Routes} from 'react-router-dom';
 import "./App.css"
import ViewExpence from './components/ViewExpence';
import Login from './components/Login';
 import Navbar from "./components/Navbar";
 import Signup from "./components/Signup";
 import AddExpence from "./components/AddExpence";
 import Error from "./components/Error";
  import Logout from './components/Logout';
 

import { initialState,reducer } from '../src/reducer/UseReducer';


 export const UserContext=createContext();

 const Routing=()=>{

  return(
    <Routes>
     <Route path="/viewexpence" element={<ViewExpence/>} />
        
     <Route path="/addexpence" element={<AddExpence/>} />

     <Route path="/login" element={<Login/>} />

     <Route path="/signup" element={<Signup/>} />

          <Route path="/logout" element={<Logout/>} />    

       {/* <Route path="/create" element={<Create/>} />   */}

     <Route  element={<Error/>} />
       
       
     {/* <Route path="/signup">
       <Signup />
     </Route> */}
     </Routes>
  )
   
}

 const App = () => {

  const [state, dispatch] = useReducer(reducer,initialState)


   return (
     
     <>
     <UserContext.Provider value={{state, dispatch}}>
     <Navbar />
      <Routing />
     </UserContext.Provider>
      
     </>
   )
 }
 
 export default App
 