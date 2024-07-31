import { useEffect, useState, useRef } from "react";
import Ray from "./Ray/Ray";

function RayNetwork(param){

 
    let pairOfPoints = [];

    var RayNetwork1 = useRef();

    //rayFlashDur is in miliseconds
    var rayFlashDur = 150;
   
    return(
        <g ref={RayNetwork1}>
            
            {
                param.arrOfRayNodePoints.map( (nodePoint, ix)=> {
                    pairOfPoints.push(nodePoint);
               
                    if(pairOfPoints.length >= 2) {
                        let start = pairOfPoints[0]; let end = pairOfPoints[1];
                        pairOfPoints[0] = pairOfPoints[1];
                        pairOfPoints.splice(pairOfPoints.length - 1, 1);

                        return <Ray startPoint={start} endPoint={end} originalSourcePos={param.sourcePos} originalDestPos={param.destPos} flashDur={rayFlashDur}/>
                       
                    }
                 
                }
                
                )
            }
                
        </g>

    )

}

export default RayNetwork;