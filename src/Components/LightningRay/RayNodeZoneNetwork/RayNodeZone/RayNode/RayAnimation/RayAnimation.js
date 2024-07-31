import { render } from "@testing-library/react";
import { useEffect, useState, useRef, forwardRef } from "react";


function RayAnimation(param){

    var tagRef = useRef(null);
    var tagRef2 = useRef(null);
    var tagRef3 = useRef(null);

    //Unmounting The animate tag (after it is mounted) after the dur time period
    useEffect(()=>{
            if(tagRef!=null){
                console.log("Animate tag mounted");
                if(tagRef.current){    
            
                let timeID = setTimeout(() => {
                delete tagRef.current;
                console.log("DELETED ANIMTAG");
                param.detectCompletionOfRayAnim("animCompleted");
                
      
            }, param.dur);
            
            }
        }
    },[tagRef]);

    //You need to unmount the component


 

    if(tagRef.current==null){
        console.log("RETURN Anim tag");
      //  console.log("MOUNTING ANIMATE TAG: sourcePOs: " + param.sourcePos);
     //   console.log("MOUNTING ANIMATE TAG: destPos: " + param.destPos);
    //    console.log("MOUNTING ANIMATE TAG: param.dur: " + param.dur);
        //<animate ref={tagRef}  attributeName="x" values={param.sourcePos[0] + ";" + param.destPos[0] + ";"} dur={param.dur + "ms"} repeatCount="1" fill="freeze" />

        
        //  
   return(
       <animate ref={tagRef} attributeName="x" values={param.sourcePos[0] + ";" + param.destPos[0] + ";"} dur={param.dur + "ms"} repeatCount="1" fill="freeze" />

      
   
   )}

 
   



    function genAnimateTag(repCount){

        return <animate attributeName="stroke-opacity" values="0; 1; 0.9; 0.8; 0.7; 0.6; 0.5; 0.4; 0.3; 0.2; 0.1; 0" dur="1s" repeatCount={repCount} />


    }

    

}




export default RayAnimation;