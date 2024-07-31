import { useEffect, useState } from "react";
import RayNode from "./RayNode/RayNode";

function RayNodeZone(param){
   
   
    let localZoneAliveDur = ( (param.totalZones - param.index) / param.totalZones ) * param.rayAliveDur;

    var [rebootRequired, set_rebootRequired] = useState(false);

    var [staticSourcePoint, set_staticSourcePoint] = useState(null);
    var [zoneAlive, set_zoneAlive]= useState(false);
    var [rayNodeDetails, set_rayNodeDetails] = useState(null);
    var timerID;

    //START SNAPSHOT ENTRY 
    //We are simply inserting a blank entry at the appropriate index. It's actual values will be updated later in the RayNode component
    useEffect(()=>{
        param.guidedSetter_pushNodeIntoSnapshottedNodes([null, null], param.index);
        console.log("RayNodeZone: GS_PushNodeIntoSnapshots called at index: " + param.index + " and ssp: " + staticSourcePoint);
    },[]);

    //END SNAPSHOT ENTRY

    //START:--ZONE ALIVE BOOTER/REBOOTER
    useEffect(()=>{
      //  console.clear();
        if (checkIfBootOrRebootIsRequired(param.liveZoneSourcePos, staticSourcePoint, rebootRequired)==true){
            clearTimeout(timerID);
            set_staticSourcePoint(param.liveZoneSourcePos);
        
            //storing SSP in temp var because state change only occurs in next render cycle
            let tempStaticSourcePoint = param.liveZoneSourcePos;
          
     
            rayNodeDetails = genRayNodeDetails(tempStaticSourcePoint, param.squareUnitSize );
            set_rayNodeDetails(rayNodeDetails);
            set_zoneAlive(true);
            set_rebootRequired(false); 
          
        }

      //  console.log("RayNodeZone: Booter/Rebooter module triggered");

    },[param.sourcePos, param.destPos, rebootRequired]);
    //END:----ZONE ALIVE BOOTER/REBOOTER

    //START:--ZONE ALIVE COUNTDOWNER
    //TO-DO : WATERMELON : Wrap up this entire useEffect in a conditional that only executes if rebootRequire is false
    useEffect(()=>{
        if (checkIfBootOrRebootIsRequired(param.liveZoneSourcePos, staticSourcePoint, rebootRequired) == true){
        timerID = setTimeout(() => {
            set_zoneAlive(false);
            //we need to set the staticSourcePoint so that the current RayNode will unmount and create a new one after SSP is assigned a new value
            set_staticSourcePoint(null);
            set_rebootRequired(true);
        
            
        }, localZoneAliveDur);

     //   console.log("RayNodeZone: Countdowner Triggered");
    }
    },[zoneAlive])
    //END:----ZONE ALIVE COUNTDOWNER



   
    return(
        rayNodeDetails != null? 
            <g>
                {staticSourcePoint ?
                    <rect fill="transparent" stroke="white" strokeWidth="2px" height={param.squareUnitSize-2} width={param.squareUnitSize-2} x={staticSourcePoint[0] - 1} y={staticSourcePoint[1] - 1} />
                    : null 
            }
               
                <rect fill="transparent" stroke="red" strokeWidth="3px" height={param.squareUnitSize} width={param.squareUnitSize} x={param.liveZoneSourcePos[0]} y={param.liveZoneSourcePos[1]}>
                   
            </rect>
            {
            staticSourcePoint ?
            <RayNode zonePos={staticSourcePoint} zoneAlive={zoneAlive} startPos={rayNodeDetails[0]} endPos={rayNodeDetails[1]} zoneAliveDur={localZoneAliveDur} 
                index={param.index}
                            guidedSetter_pushNodeIntoSnapshottedNodes={param.guidedSetter_pushNodeIntoSnapshottedNodes}
                            guidedSetter_updateNodeInSnapshottedNodes={param.guidedSetter_updateNodeInSnapshottedNodes}
                            currActiveButtonIx={param.currActiveButtonIx}
            />
                : null
        }
            </g>
        :null
    )


    function genRayNodeDetails(staticSourcePoint, squareUnitSize){

        let startPosX = staticSourcePoint[0] + (Math.random()*squareUnitSize);
        let startPosY = staticSourcePoint[1] + (Math.random() * squareUnitSize);
        let startPos = [startPosX, startPosY];

        let endPosX = staticSourcePoint[0] + (Math.random() * squareUnitSize);
        let endPosY = staticSourcePoint[1] + (Math.random() * squareUnitSize);
        let endPos = [endPosX, endPosY];

        return [startPos, endPos];

    }
    
    function staticZoneBoundryCrossed(liveZoneSourcePos, currStaticSourcePoint, squareUnitSize){

        //safety: If static point is not yet set, init it
        if (currStaticSourcePoint ==null){
            set_staticSourcePoint(liveZoneSourcePos);
            return true;
        }


        //measure dist between livePoint and staticPoint. check if its bigger than squareUnitSize/2
        let xDist = Math.abs( liveZoneSourcePos[0] - currStaticSourcePoint[0] );
        let yDist = Math.abs(liveZoneSourcePos[1] - currStaticSourcePoint[1]);

        let actualDist = Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );

        //debug note: consider changing the divisor to 2, if you find that you need too much distance to update to static
        if(actualDist > squareUnitSize/1){
            return true;
        }

        return false;
    }



    //HELPER FUNCS START
    //Must return true if a boot OR reboot is required
    function checkIfBootOrRebootIsRequired(liveZoneSourcePos, staticSourcePoint, rebootRequired){
        //We must check for 2 factors - whether the rebootRequired is true, and whether it crosses the boundry
        //Keep in mind that staticSourcePoint might be null. We have to deal with that.
        if(staticSourcePoint==null){
            return true;
        }

        else if(staticSourcePoint!=null){
            if (staticZoneBoundryCrossed(liveZoneSourcePos, staticSourcePoint, param.squareUnitSize)===true){
                return true;
            }    
        }

        if(rebootRequired==true){
            return true;
        }

        return false;

    }
    //HELPER FUNCS END

    //START: DESIGNATED SETTERS
    function setStaticSourcePoint(input){
        set_staticSourcePoint(input);
    }
    //END: DESIGNATED SETTERS

}


export default RayNodeZone;