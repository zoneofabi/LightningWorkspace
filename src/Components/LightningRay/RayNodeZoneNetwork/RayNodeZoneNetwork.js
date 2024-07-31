import { useEffect, useState } from "react";
import RayNodeZone from "./RayNodeZone/RayNodeZone";

function RayNodeZoneNetwork(param){



    useEffect(() => {
  
     //   console.log("RayNodeZoneNetwork Mounted ");

    }, []);

 
    

    //these indexes are local to the network and will be updated based on the lifetime cycles of each zone.
    var [startIx, set_startIx] = useState(null);
    var [endIx, set_endIx] = useState(null);
    var [zoneSourcePointsArr, set_zoneSourcePointsArr] = useState(null);


    

    //Deciding if the ray needs to be initialized or not (This will play once on every render (empty dependency arr))
    useEffect(()=>{
        if (startIx == null || endIx == null){
            param.guidedSetter_rayNeedsInit(true);
        }

        else{
            param.guidedSetter_rayNeedsInit(false);
        }
    },[]);


    //this useEffect block will trigger every time it detects a new mouse pos or emitter change pos.
    //Because that would mean a new series of zone points have to be calculated and contrasted with the ghost points
    useEffect(()=>{
        if(param.svgCtxObj.current != null){
            let tempArr = new Array();
            
            //extracting sourcePos and destPos
            // menuButtonsArr={menuButtonsArr} currActiveButtonIx={currActiveButtonIx}
            let srcPos = (param.menuButtonsArr[param.currActiveButtonIx]).coords;
          

            tempArr = genRayZoneSourcePoints(srcPos, param.destPos, param.squareUnitSize, param.svgCtxObj);
            set_zoneSourcePointsArr([... [0, 0]]);

            set_zoneSourcePointsArr(tempArr);
            //Maybe set the arr of snapshot here

            param.set_zoneSourcePointsArrRef(tempArr);

          //  let ix = zoneSourcePointsArr.length;
          //  param.guidedSetter_chopOffFromIndexInSnapshottedNodes(ix);
        }

    },[param.sourcePos, param.destPos]);


    //This useEffect block will trigger with the zoneSourcePointsArr
     
  
    

    
    if(zoneSourcePointsArr){
   //     console.log("RayNodeZoneNetwork: zoneSourcePOints.length: " + zoneSourcePointsArr.length);
    }


    return(
        zoneSourcePointsArr!=null ?
        zoneSourcePointsArr.map( (sourcePoint, index) =>{ 
            return(
                     <RayNodeZone liveZoneSourcePos={sourcePoint} squareUnitSize={param.squareUnitSize} 
                         index={index} totalZones={zoneSourcePointsArr.length} rayAliveDur={param.rayAliveDur}
                         emitterPos={param.sourcePos} destPos={param.destPos}
                        
                    guidedSetter_pushNodeIntoSnapshottedNodes={param.guidedSetter_pushNodeIntoSnapshottedNodes}
                    guidedSetter_updateNodeInSnapshottedNodes={param.guidedSetter_updateNodeInSnapshottedNodes}
                    key={index}
                    currActiveButtonIx={param.currActiveButtonIx}
                         /> 
                )
        }
        ) 
        : null
    )


    //this will find the coordinates of the source points of each division directly on the ray path (the center points of each div square)
    function genRayZoneSourcePoints(sourcePos, destPos, squareUnitSize, svgCtxObj) {
        
        //NOTE: we need to get the svg relative coords of the mousePos
        //Remember the source coords are already SVG relative. So no need to conver tthat.
        let destPoint = svgCtxObj.current.createSVGPoint();
       
        destPoint.x = destPos[0]; destPoint.y = destPos[1];
    

        destPoint = destPoint.matrixTransform(svgCtxObj.current.getScreenCTM().inverse());
        
        //1: find the X-Axis_to_Ray angle (using sourcePos and destPos)
        let line_sourceToDest_X = destPoint.x - sourcePos[0];
        let line_sourceToDest_Y = destPoint.y - sourcePos[1];

        //BUG NOTE: If the coords are converted properly, the x and y should be between 0 and 1000
        //tan(theta) = X/Y
        let angle_XAxis_Source_Dest = Math.atan(line_sourceToDest_X / line_sourceToDest_Y);
    

        //2: Now calculate the length of each div line
        //2.1: calc the length of the source_to_dest line (use pythagorean)
        let line_sourceToDest = Math.sqrt(Math.pow(line_sourceToDest_X, 2) + Math.pow(line_sourceToDest_Y, 2));

        let squareReps = Math.floor(line_sourceToDest / squareUnitSize);
        let extraSquare = ((line_sourceToDest / squareUnitSize)) - Math.floor(line_sourceToDest / squareUnitSize);

        //3: Now procedurally get the coordinates of the div points starting from src to dest (use an incrementing length)
        let snakeLength = 0;

        let snakeCoords = [sourcePos[0], sourcePos[1]];

        let divSourcePointsArr = [];

        for (let x = 0; x < squareReps; x++) {

            snakeLength = snakeLength + squareUnitSize;

            let xDist = Math.sin(angle_XAxis_Source_Dest) * snakeLength;
            let yDist = Math.cos(angle_XAxis_Source_Dest) * snakeLength;

            snakeCoords[0] = sourcePos[0] + xDist;
            snakeCoords[1] = sourcePos[1] + yDist;

            divSourcePointsArr.push([snakeCoords[0], snakeCoords[1]]);

            //this will execute only if its the last block
            if (x == (squareReps - 1)) {
           
                snakeLength = snakeLength + (extraSquare * squareUnitSize);
                xDist = Math.sin(angle_XAxis_Source_Dest) * snakeLength;
                yDist = Math.cos(angle_XAxis_Source_Dest) * snakeLength;

                snakeCoords[0] = sourcePos[0] + xDist;
                snakeCoords[1] = sourcePos[1] + yDist;

                divSourcePointsArr.push([snakeCoords[0], snakeCoords[1]]);
            }

        }

        return divSourcePointsArr;

    }

    
}

export default RayNodeZoneNetwork;