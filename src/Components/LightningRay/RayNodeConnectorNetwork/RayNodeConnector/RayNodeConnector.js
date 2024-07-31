function RayNodeConnector(param){

    console.log("RNC: param.pairOfRayNodeDetails : " + param.pairOfRayNodeDetails);

    //IMPORTANT LINES BELOW: How to access the relevant data for setting the node connection points

    //connectFROM node travel details
  //  console.log("PORND[0]: " + param.pairOfRayNodeDetails[0]);
  //  console.log("-------------");
        //ConnectFROM StartNode    
     //   console.log("__PORND[0][0][0]: " + param.pairOfRayNodeDetails[0][0][0]);

        //ConnectFROM EndNode    
    //    console.log("__PORND[0][0][1]: " + param.pairOfRayNodeDetails[0][0][1]);

    //connectTO node travel details
   // console.log("PORND[1]: " + param.pairOfRayNodeDetails[1]);

        //ConnectTO StartNode    
      //  console.log("__PORND[1][0][0]: " + param.pairOfRayNodeDetails[1][0][0]);

        //ConnectTO EndNode    
      //  console.log("__PORND[1][0][1]: " + param.pairOfRayNodeDetails[1][0][1]);


    //CONNECTFROM_Start TO -> ConnectTo Start
    //ConNECFrom-End To > ConnectTo End 
  //  let connectFROMStart_To_ConnectTOStart = null;
  //  let connectFROMEnd_To_ConnectTOEnd = null;

    //we must check to see if param.pairOfRayNodeDetails[0] and param.pairOfRayNodeDetails[1] both satisfy the struct [startCoords, destCoords, localZoneAliveDur, index]
    /** 
    if(param.pairOfRayNodeDetails){

        if(pairSatisfiesStruct(param.pairOfRayNodeDetails[0], param.pairOfRayNodeDetails[1]==true)){
            connectFROMStart_To_ConnectTOStart = createRayPathString(param.pairOfRayNodeDetails[0][0], param.pairOfRayNodeDetails[1][0]);
            connectFROMEnd_To_ConnectTOEnd = createRayPathString(param.pairOfRayNodeDetails[0][1], param.pairOfRayNodeDetails[1][1]);
        }
    }
    */
   /** 
    return(
        connectFROMStart_To_ConnectTOStart, connectFROMEnd_To_ConnectTOEnd?
        <g>
            <path d={connectFROMStart_To_ConnectTOStart} stroke="blue" stroke-width="2" >
                <animate attributeName="d" values={connectFROMStart_To_ConnectTOStart + ";" + connectFROMEnd_To_ConnectTOEnd + ";"} dur="1s" repeatCount="indefinite" />
            </path>
        </g>
        :null
    )

        */

    

    function createRayPathString(startPos, endPos) {

        let pathString = "M" + startPos[0] + " " + startPos[1] + " L" + endPos[0] + " " + endPos[1] + " Z";

        return pathString;

    }


    function pairSatisfiesStruct(p1, p2){

        if(p1){
        if(p1.length > 0 && p2.length > 0){
            console.log("SATISFIES STRUCT");
            return true;
        }
    }

        return false;

    }

}


export default RayNodeConnector;