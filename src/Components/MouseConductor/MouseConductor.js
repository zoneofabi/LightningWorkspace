import { useEffect, useState } from "react";

function MouseConductor(param){

    var [trueSVGPos, set_trueSVGPos] = useState([100,100]);

    useEffect(()=>{
        set_trueSVGPos(genTrueSVGPos(param.livePos, param.svgCtxObj));
    },[param.livePos]);
    

    return(
        <g>
            <circle cx={trueSVGPos[0]} cy={trueSVGPos[1]} r="10" stroke="red" strokeWidth="2px" />
        </g>
    )




    function genTrueSVGPos(coords, svgCtx){

        let svgPoint = svgCtx.current.createSVGPoint();

        svgPoint.x = coords[0]; svgPoint.y = coords[1];

        let trueMousePos = svgPoint.matrixTransform(svgCtx.current.getScreenCTM().inverse());
    
        let returnPackage = [trueMousePos.x, trueMousePos.y];
        return returnPackage;
        
    }

}


export default MouseConductor;