import { useEffect, useState } from "react";

import RayNodeZoneNetwork from "./RayNodeZoneNetwork/RayNodeZoneNetwork";


import RapidRay from "./RapidRay/RapidRay";

function LightningRay(param){

  //  console.log("LightningRay Component Rendered");

//Legend: RNZ = Ray Node Zones 

//Legend: RayNeedsInit: Ray Needs Initialization (to determine whether a flashOn anim is required)
let [rayNeedsInit, set_rayNeedsInit] = useState(false);

//Will track each node as it is made and then ensure it gets popped off after its lifecycle
let [aliveNodes, set_aliveNodes] = useState([]); 

let [snapshottedNodes, set_snapshottedNodes] = useState([]);

let [zoneSourcePointsArrRef, set_zoneSourcePointsArrRef] = useState([]);





//LR mounting checker
useEffect(()=>{
    console.log("Lightning Ray Mounted");
    return unmountActions;
},[]); 

function unmountActions(){
    //must delete existing anims and active RNZs

    console.log("LightningRay: UnmountActions called ");
}


/**
 * this decides the summative alive dur. It must go inside a ray node zone and that zone's index
 * position will decide how much magnitude of this value it should assign to that zone. Measured in miliseconds
*/
const rayAliveDur = 3000;

return(

    <g>

        <RayNodeZoneNetwork 
            squareUnitSize={param.squareUnitSize}  
            guidedSetter_rayNeedsInit={guidedSetter_rayNeedsInit}
          
            sourcePos={param.sourcePos} destPos={param.destPos}
            menuButtonsArr={param.menuButtonsArr} currActiveButtonIx={param.currActiveButtonIx}

            svgCtxObj={param.svgCtxObj}
            rayAliveDur={rayAliveDur}

            guidedSetter_pushNodeIntoSnapshottedNodes={guidedSetter_pushNodeIntoSnapshottedNodes}
            guidedSetter_updateNodeInSnapshottedNodes={guidedSetter_updateNodeInSnapshottedNodes}
            guidedSetter_chopOffFromIndexInSnapshottedNodes={guidedSetter_chopOffFromIndexInSnapshottedNodes}
            set_zoneSourcePointsArrRef={set_zoneSourcePointsArrRef}
           
            />

      
        
                
        { greenLightSnapshottedNodes(snapshottedNodes)===true ?
        <RapidRay snapshottedNodes={snapshottedNodes}
                guidedSetter_chopOffFromIndexInSnapshottedNodes={guidedSetter_chopOffFromIndexInSnapshottedNodes}
                zoneSourcePointsArrRef={zoneSourcePointsArrRef}
                currActiveButtonIx={param.currActiveButtonIx}
                sourcePos={param.sourcePos} destPos={param.destPos}
        /> 
        :null             
        }

        
    </g>

)

//Guided setters



function guidedSetter_rayNeedsInit(input){
    if(input == true || input == false){
        set_rayNeedsInit(input);
    }
}


    function makedo_chopOffFromIndexInSnapshottedNodes(arr, targetIx){
        if ((arr.length - 1) > targetIx) {

            let tempArr = new Array();

            for (let x = 0; x <= targetIx; x++) {
                tempArr.push(arr[x]);
            }

            return tempArr;

        }
    }



//Will remove all indexes beyond the index from the snapshot nodes
function guidedSetter_chopOffFromIndexInSnapshottedNodes(targetIx){

    if( (snapshottedNodes.length-1) > targetIx ){

        let tempArr = new Array();

        for(let x=0; x<=targetIx; x++){
            tempArr.push(snapshottedNodes[x]);
        }

        set_snapshottedNodes(tempArr);

    }


    /** 
    let tempSnapshots = snapshottedNodes;
    const newArr = snapshottedNodes.filter(  (item, index) => index <= targetIx );
    set_snapshottedNodes(newArr);
    */
    

}

//Will only update an existing node by its index. 
function guidedSetter_updateNodeInSnapshottedNodes(node, index){

    let result = existsInSnapshottedNodes(index, snapshottedNodes);

    if(result == false){
        console.log("ERROR: GS_UpdateNodeInSnapshotted called but index does not exist");
    }

    var tempArr = [...snapshottedNodes];

    tempArr[index] = { node: node, index: index };

    

    set_snapshottedNodes(null);
    set_snapshottedNodes(tempArr);

  //  console.log("GS_UpdateNodeInSnapshottedNodes called at index : " + index + " lengthSoFar: " + snapshottedNodes.length);

    function existsInSnapshottedNodes(index, globalSnapshottedNodes) {

        for (let x = 0; x < globalSnapshottedNodes.length; x++) {

            let extractedNode = globalSnapshottedNodes[x];
            let extractedNodeIndex = extractedNode.index;
         
            
            if (extractedNodeIndex == index) {
                return true;
            }

        }

        return false;

    }

}

function guidedSetter_pushNodeIntoSnapshottedNodes(node, index){

    if(snapshottedNodes){
        if (snapshottedNodes.length < 1) {
        
            set_snapshottedNodes(curr => [...curr, {node: node, index: index}]);
    
        //    console.log("GS_PushIntoSnapshotted (INIT): inputs : node: " + node + " , index: " + index + " currLengthSoFar: " + snapshottedNodes.length);
          //  console.log("GS_PushIntoSnapshotted (INIT) : curr arr : " + JSON.stringify(snapshottedNodes));
            return;
        }

        else{
            let result = existsInSnapshottedNodes(index, snapshottedNodes);

            if (result == false) {
                set_snapshottedNodes(curr=>[...curr, {node: node, index: index}]);
              //  console.log("GS_PushIntoSnapshotted INSERTION : curr arr : " + JSON.stringify(snapshottedNodes));
                return;
            }

        }
    }

        
    

    function existsInSnapshottedNodes(index, globalSnapshottedNodes) {

        for (let x = 0; x < globalSnapshottedNodes.length; x++) {

            let extractedNode = globalSnapshottedNodes[x];
            let extractedNodeIndex = extractedNode.index;
           

            if (extractedNodeIndex == index) {
                return true;
            }

        }
        return false;
    }

}

function greenLightSnapshottedNodes(){

    let allValid = true;

    if(snapshottedNodes.length > 0){

        for(let x=0; x<snapshottedNodes.length; x++){
            if(snapshottedNodes[x].node[0] === null){
                allValid = false;
            }
        }

        if(allValid===true){

            let targetIx = zoneSourcePointsArrRef.length-1;
            guidedSetter_chopOffFromIndexInSnapshottedNodes(targetIx);

            //extra safety conditional to make sure the state change of snapShots has taken place
            if(snapshottedNodes.length === zoneSourcePointsArrRef.length){
                return true;
            }
        }

    }

    console.log("Greenlight False : SnapshotsLength : " + snapshottedNodes.length + " snapArr : " + JSON.stringify(snapshottedNodes) );
    return false;

}
      


}

export default LightningRay;