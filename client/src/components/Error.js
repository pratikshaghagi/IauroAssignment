import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
           <h1>404 error page</h1> 
           <br></br>
           <NavLink to="/">back to home</NavLink>
        </>
    )
}

export default Error
