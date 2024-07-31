import './Styles_SVGContainer.css';
import Filters from './Filters/Filters';
import Emitter from '../Emitter/Emitter';
import { useEffect, useRef, useState } from 'react';
import LightningRay from '../LightningRay/LightningRay';
import MenuButtonsCollection from '../MenuButtonsCollection/MenuButtonsCollection';
import MouseConductor from '../MouseConductor/MouseConductor';

//globals
var viewBoxConfig = "0 0 1000 1000";
//how many squares to create in the path for node targets

//menu buttons arr
var menuButtonsArr = [{title:'3D Engines', coords:[200, 200]},
    { title: 'Extraterrestrial Sightings', coords: [600, 200] },
    { title: 'CGI', coords: [200, 600] },
    { title: 'Writing', coords: [600, 600] }
                        ];

var lightingRay_squareComplexity = 10;
var lightingRay_squareUnitSize = 40;
var lightingRay_squareWidth = 40;

//how far should the  mouse be from the button in order to create a ray from it
//Best value is 500
const lightingConductSenseLength = 500;





function SVGContainer(){

    //emitter Pos is of format: cx, cy, r 
    let [emitterPos, set_emitterPos] = useState([100, 100, 100]);

    //the SVG coordinates of the clicked position (it must be converted from DOM to SVG)
    let [clickPos, set_clickPos] = useState([430, 10]);

    let [mouseLivePos, set_mouseLivePos] = useState([0, 0]);
    let [mouseConductorPos, set_mouseConductorPos] = useState([0, 0]);

    //Will define the index of which button is active so it can take it out of the arr
    let [currActiveButtonIx, set_currActiveButtonIx] = useState(-1);

    let [forceTrigger, set_forceTrigger] = useState(false);

    let [lightningRaySwitcherCount, set_lightningRaySwitcherCount] = useState(0);

    

    let svgCtxObj = useRef(null);

   
    useEffect(()=>{
        console.log("SVGContainer Mounted");
    },[])

    return(
       
        <svg id="mainSVGContainer" ref={svgCtxObj} className="MainSVGContainer" viewBox={viewBoxConfig} onClick={updateMouseClickPos} onMouseMove={handleMouseMove} >

            <MenuButtonsCollection menuButtonsArr={menuButtonsArr}/>

            
            {
            currActiveButtonIx!=-1?
            <Emitter menuButtonsArr={menuButtonsArr} currActiveButtonIx={currActiveButtonIx} viewBoxConfig={viewBoxConfig} emitterPos={emitterPos} /> 
            :null
            }

            <Filters/>

            
            {
            currActiveButtonIx!=-1?    
            <LightningRay sourcePos={emitterPos} destPos={mouseLivePos} 
                        menuButtonsArr={menuButtonsArr} currActiveButtonIx={currActiveButtonIx}
                         squareWidth={lightingRay_squareWidth} 
                squareUnitSize={lightingRay_squareUnitSize} svgCtxObj={svgCtxObj}
                forceTrigger={forceTrigger}
                />
            :null    
            }
            <MouseConductor livePos={mouseConductorPos} svgCtxObj={svgCtxObj} />    
            
        </svg>
  
    )


    function handleMouseMove(event){


        set_mouseLivePos([event.clientX, event.clientY]);
        set_mouseConductorPos([event.clientX, event.clientY]);

        //set curr active button after checking proximity
        let currActiveButtonIndex = detectCurrActiveButton(menuButtonsArr, [event.clientX, event.clientY]);

        


        //detect change
        if (currActiveButtonIndex != currActiveButtonIx){
           if(currActiveButtonIx != -1){
                set_currActiveButtonIx(-1);
           }
           else{
                set_currActiveButtonIx(currActiveButtonIndex);
           }
        
        }

        



        if(currActiveButtonIndex != -1){
           // console.log("CurrActiveButtonIx Changed  to " + currActiveButtonIndex);
        //    set_currActiveButtonIx(-1);
         //   set_currActiveButtonIx(currActiveButtonIndex);
        }

    }


    //mousePos is an array
    function detectCurrActiveButton(menuButtonsArr, mousePos){

        //Note mousePos first has to tbe convereted to SVG relative
        let mouseSVGPoint = svgCtxObj.current.createSVGPoint();
        mouseSVGPoint.x = mousePos[0]; mouseSVGPoint.y=mousePos[1];
        mouseSVGPoint = mouseSVGPoint.matrixTransform(svgCtxObj.current.getScreenCTM().inverse());

        for(let x=0; x<menuButtonsArr.length; x++){

            let currButtonPos = menuButtonsArr[x].coords;

            let xDist = Math.abs(mouseSVGPoint.x - currButtonPos[0]);
            let yDist = Math.abs(mouseSVGPoint.y - currButtonPos[1]);

            let hyp = Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
            /** 
            console.log("DCA: x: " + x + " buttonPos[" + currButtonPos[0] + " , " + currButtonPos[1] + "]");
            console.log(" -----mousePos: [" + mouseSVGPoint.x + ", " + mouseSVGPoint.y + "]");
            console.log(" -----xDist: " + xDist);
            console.log(" -----yDist: " + yDist);
            console.log(" -----hyp: " + hyp);
            */
            if(hyp < lightingConductSenseLength){

                console.log(" ---: cond - hyp < lcsl: hyp:" + hyp + " , lcsl: " + lightingConductSenseLength + " x: " + x);
                return x;
            }

        }

        //to indicate error
        return -1;

    }

    function updateMouseLivePos(event){

        set_mouseLivePos([event.clientX, event.clientY]);

    }

    function updateMouseClickPos(event) {

        console.log("clientX: " + event.clientX + " , " + event.clientY);

      //  let tempArr = new Array();
      //  tempArr.push(event.clientX);tempArr.push(event.clientY)

        //set_clickPos([...[0,0],[0,0]]);
        set_clickPos([event.clientX, event.clientY]);

        if(forceTrigger==true){
            set_forceTrigger(false);
            console.log("Force trigger updated");
        }
        else if(forceTrigger==false){
            set_forceTrigger(true);
            console.log("Force trigger updated");
        }

    }
}


export default SVGContainer;