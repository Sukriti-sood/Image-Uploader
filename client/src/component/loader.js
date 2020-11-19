import React, { useState, useEffect } from "react";

function Loader(){

    const [width,setwidth]=useState(0);
    const[auto,setauto]=useState(false);
    useEffect(()=>{
        let interval=null;
      
      {
            interval=setInterval(() => {
                setwidth(width+10);
            
                console.log(width)
                if(width>=80)
                {
             console.log(width)
             setauto(true);
                }
                else
                setauto(!auto);
                if(auto)
                clearInterval(interval);
            }, 500);}
       
      return () => clearInterval(interval);
    },[auto])
    const mystyle={"width":String(width)+"%"};
    return(
        <>
        <div className="loader">
        <h2>Uploading...</h2>
        <div className="bar">
            <div className="fill" style={mystyle}></div>
        </div>
        </div>
        </>
    )
}

export default Loader;