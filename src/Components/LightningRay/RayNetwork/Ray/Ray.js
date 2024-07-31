import { useEffect, useState, useRef, useCallback } from "react";
import RayAnimation from "./RayAnimation/RayAnimation";

function Ray(param){
    
    var [ceaseRenderOfRayAnim, set_ceaseRenderOfRayAnim] =useState();

    //Setting ceaseRenderOfRayAnim to false when it detects a fresh startPoint, endPointt
    useEffect(()=>{
        set_ceaseRenderOfRayAnim(false);
    },[param.startPoint, param.endPoint]);

    

    const detectCompletionOfRayAnim = reponse => {
        if (reponse == "animCompleted") {
            set_ceaseRenderOfRayAnim(true);
        }
    }

    let pathString = createRayPathString(param.startPoint, param.endPoint);
   
    return(
        <g>
            <path d={pathString} stroke="blue" stroke-width="2" >

                { ceaseRenderOfRayAnim==false?

                    <RayAnimation detectCompletionOfRayAnim={detectCompletionOfRayAnim}  repeatCount="1" sourcePos={param.startPoint} destPos={param.destPoint} flashDur={param.flashDur}/>
                :null
                }
            
            </path>

        </g>
    )
  
}

function createRayPathString(startPos, endPos) {

    let pathString = "M" + startPos[0] + " " + startPos[1] + " L" + endPos[0] + " " + endPos[1] + " Z";

    return pathString;

}

export default Ray;