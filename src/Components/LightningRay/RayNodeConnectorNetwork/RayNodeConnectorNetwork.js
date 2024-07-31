import { useEffect, useState } from "react";
import RayNodeConnector from "./RayNodeConnector/RayNodeConnector";


function RayNodeConnectorNetwork(param){

   
   var [juncs, set_juncs] = useState([]);

   //Will updated juncs whenever it detects a new node added to aliveNodes
   useEffect(()=>{
    let juncsToInsert = genJuncs(param.aliveNodes);
    set_juncs( [...juncs, [juncsToInsert]]  );
   },[param.aliveNodes]);
    


   {
    if(juncs.length > 1){
       // let poppedJunc = juncs.pop();
      //  return <RayNodeConnector junc={poppedJunc}/>
        
      juncs.map((junc)=>{
    
        <RayNodeConnector junc={junc}/>
      })
       
    }
   }
    
    return(
       <></>
    )
    
    

    

    function genJuncs(liveNodes){

        console.log("genJuncs called");

        //Must use the guidedPopper to get rid of a node after making a junc
        let localJuncs = [];

        let currPair_ixs = [];
        let candidate1_ix = -1;
        let candidate2_ix = -1;

        let currTrackedIx = -2;

        //Must scan through liveNodes, look for nodes to pair (index in ascending with 1 diff), and then delete them after pairing
        for(let x=0; x<liveNodes.length; x++){

            //if 1 diff detected, time to make pair and remove it
            if(x-currTrackedIx == 1){
                currPair_ixs = [currTrackedIx, x];
                let currJunc = [liveNodes[currTrackedIx], liveNodes[x]];

                console.log("CurrJunc: " + currJunc[0].index + " , " + currJunc[1].index);
                localJuncs.push(currJunc);
          

                //we must use the same currTrackedIx twice because after a pop, it will shift the array leftways by 1 index
              //  param.guidedSetter_popNodeOffAliveNodes(currTrackedIx);
                console.log("Pop called at RNCN");
               // param.guidedSetter_popNodeOffAliveNodes(currTrackedIx);

                //decrement back 2 indexes to avoid skipping 2 elems
              //  x = x-2;
            }

        
            currTrackedIx = x;

        }

        return localJuncs;
        


    }

}


export default RayNodeConnectorNetwork;


