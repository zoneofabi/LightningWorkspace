//We must keep track of the node's current position. Update it to the dest pos after the anim has finished.

import { useEffect, useState, useRef } from "react";

function RayNode(param){

    const nodeRect = useRef();

    var [currPos, set_currPos] = useState(null);

    var [ceaseRenderOfRayAnim, set_ceaseRenderOfRayAnim] = useState(false);

    var [recorder, set_recorder] = useState(0);


    //intial record
    useEffect(()=>{
        if(nodeRect.current!=null){
        let nodeObject = [nodeRect.current.x.animVal.value, nodeRect.current.y.animVal.value];
        console.log("RayNode " + param.index + " mounted + param.ssp : " + param.zonePos);
        param.guidedSetter_updateNodeInSnapshottedNodes(nodeObject, param.index);
        }
        set_recorder(recorder+1);
    },[]);


    setTimeout(() => {
        set_recorder(recorder+1);
    }, 5);


   



    useEffect(()=>{

        //Record the snapshotted nodes here
        if (nodeRect.current != null) {

            let nodeObject = [nodeRect.current.x.animVal.value, nodeRect.current.y.animVal.value];
            console.log("RayNode:UNISN: snapShottedNodes updated at : " + param.index + " recorder Val : " + recorder);
            
            param.guidedSetter_updateNodeInSnapshottedNodes(nodeObject, param.index);
         
            
        }

    },[recorder]);

   


    //state handler func
    const detectCompletionOfRayAnim = reponse => {
        if (reponse == "animCompleted") {
            set_ceaseRenderOfRayAnim(true);
        }
    }

    //rebooter
    useEffect(()=>{
        if(ceaseRenderOfRayAnim==false){
            set_ceaseRenderOfRayAnim(true);
        }
    },[ceaseRenderOfRayAnim]);

    return(
       
        <g>
            
            <rect ref={nodeRect} fill="blue" stroke="orange" strokeWidth="3px" width="20px" height="20px" x={param.startPos[0]} y={param.startPos[1]}>
               
                <animate attributeName="fill" values="transparent; transparent;" dur="3s" repeatCount="indefinite" fill="freeze" />
          
                <animate  attributeName="x" values={param.startPos[0] + ";" + param.endPos[0] + ";"}
                    dur={param.zoneAliveDur + "ms"} repeatCount="indefinite" fill="freeze" />

                <animate attributeName="y" values={param.startPos[1] + ";" + param.endPos[1] + ";"}
                    dur={param.zoneAliveDur + "ms"} repeatCount="indefinite" fill="freeze" />

                
                </rect>

        </g>
       
    )
}

export default RayNode;