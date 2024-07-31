import { useEffect, useLayoutEffect, useRef, useState } from "react";




function RapidRay(param){




 

    /** 
    useLayoutEffect(()=>{
        rayStringRef = constructRay(param.snapshottedNodes);
    },[]);
    */

    const [stateRay, set_stateRay] = useState(constructRay(param.snapshottedNodes));


    console.log("RapidRay Rendered : stateRay : " + stateRay);
    // const [testerStateRay, set_testerStateRay] = useState("M241.13714599609375 256.5529479980469 Q 241.13714599609375 256.5529479980469 270.8134460449219 264.3864440917969 Q 270.8134460449219 264.3864440917969 275.98602294921875 325.6629943847656 Q 275.98602294921875 325.6629943847656 332.7242431640625 330.3598937988281 Q 332.7242431640625 330.3598937988281 337.4530944824219 354.00665283203125 Q 337.4530944824219 354.00665283203125 370.4491271972656 407.07928466796875 Q 370.4491271972656 407.07928466796875 419.07952880859375 437.28204345703125 Q 419.07952880859375 437.28204345703125 445.116943359375 465.13006591796875 Q 445.116943359375 465.13006591796875 440.8177185058594 473.71343994140625");
        
    

    useEffect(()=>{
        if(param.snapshottedNodes.length >=1){
            let ray = constructRay(param.snapshottedNodes);
            set_stateRay(ray);
        }
    }, [param.snapshottedNodes,  param.sourcePos, param.destPos ]);
    

        return(

             <g>
                
                <path  d={stateRay} stroke="blue" fill="transparent" stroke-width="6"  >  
                
            </path>

                <path  d={stateRay} stroke="#ca38ff" filter="url(#blur)" fill="transparent" stroke-width="5"  >

                </path>

                <path  d={stateRay} stroke="#fcbaff" filter="url(#blur2)" fill="transparent" stroke-width="3"  >

                </path>
        </g>
        )

         
    





    function createRayPathString(startPos, endPos) {

        let pathString = "M" + startPos[0] + " " + startPos[1] + " L" + endPos[0] + " " + endPos[1] + " Z";

        return pathString;

    }

    //will take in an arr of nodes (each node is just a x and y position)
    //arr must have a minimum of 2 nodes
    function constructRay(arr){

        let startingNode = arr[0].node;

        let pathString = "M" + startingNode[0] + " " + startingNode[1];

        let prevNode = arr[0].node;

        for(let x=1; x<arr.length; x++){
            //Add a curv q 
            let currNode = arr[x].node;

            prevNode = arr[x-1].node;

            let xDiff = Math.abs( currNode[0] - prevNode[0] );
            let yDiff = Math.abs( currNode[1] - prevNode[1]);

            //use this to create a curve
            let midPointX = prevNode[0] + (xDiff/2);
            let midPointY = prevNode[1] + (yDiff/2); 

            //temporarily changing it to 0 to take out the curve effect
            midPointX = prevNode[0] + 0;
            midPointY = prevNode[1] + 0;

          //  pathString = pathString + " Q " + arr[x].node[0] + " " + arr[x].node[1] + " " + arr[x].node[0] + " " + arr[x].node[1];
            pathString = pathString + " Q " + midPointX + " " + midPointY + " " + arr[x].node[0] + " " + arr[x].node[1];
        } 

        //For some reason adding the Z to close the path forms a line from the starting node to the ending node.
        //pathString = pathString + " Z";
     //   console.log("PathString : " + pathString);
        return pathString;

    }


    function makedo_chopOffFromIndexInSnapshottedNodes(arr, targetIx) {

        console.log("RapidRay: Makedo : targetIx: " + targetIx + " arr : " + arr );
        if ((arr.length - 1) > targetIx) {

            let tempArr = new Array();

            for (let x = 0; x <= targetIx; x++) {
                tempArr.push(arr[x]);
            }

            console.log("RapidRay: Makedo conditional : temparr: " + tempArr);
            return tempArr;

        }
        else{
            console.log("RapidRay: Makedo ELSE : argetIx " + targetIx + " arr : " + arr );
            return arr;
        }
    }


}



export default RapidRay;