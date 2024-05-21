import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'

import { UserContext } from '../App'

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext)
  const RenderMenu=()=>{
        if (state) {
          return (
            <> 
            
              <li className="nav-item active mx-3">
                <NavLink className="nav-link" to="/viewexpence">View Expence </NavLink>
              </li>
                  <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/addexpence">Add Expance</NavLink>
              </li>    

              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                
              </li>

       
            </>
          )
        }else{
          return(
            <>
            
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </li>
              
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/login">Signin</NavLink>
                
              </li>
       
     
            </>
          )
        }
  }

    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Expence Traker</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mx-5">
                <RenderMenu /> 
                
              </ul>
              
            </div>
          </nav>
        </>
    )
}

export default Navbar