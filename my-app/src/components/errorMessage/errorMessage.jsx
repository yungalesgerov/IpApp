import React from "react";
import img from './errorMessage.png';
const ErrorMessage = () => {
    return ( <>
            <img src={img} style={{width:200, marginTop:100}} alt='error' ></img> 
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;