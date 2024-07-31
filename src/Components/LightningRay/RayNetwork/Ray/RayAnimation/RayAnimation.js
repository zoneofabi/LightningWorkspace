import { render } from "@testing-library/react";
import { useEffect, useState, useRef, forwardRef } from "react";


function RayAnimation(param){

    var tagRef = useRef(null);

    //Unmounting The animate tag (after it is mounted) after the flashDur time period. Then setting the ceaseRenderOfAnimTag state
    useEffect(()=>{
            if(tagRef!=null){
                if(tagRef.current){    
            
                let timeID = setTimeout(() => {
                delete tagRef.current;
                param.detectCompletionOfRayAnim("animCompleted");
                
      
            }, param.flashDur);
            
            }
        }
    },[tagRef]);

 

    if(tagRef.current==null){
     
   return(
    
       <animate ref={tagRef}  attributeName="stroke-opacity" values="0; 1; 0.9; 0.8; 0.7; 0.6; 0.5; 0.4; 0.3; 0.2; 0.1; 0" dur={param.flashDur + "ms"} repeatCount="1" fill="freeze" />
     
   )}

}


export default RayAnimation;