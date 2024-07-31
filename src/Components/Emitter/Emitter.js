function Emitter(param){

    console.log("Emitter rendered curractiveIx : " + param.currActiveButtonIx);

    return(
        <g>
         <filter id="blur1">
            <feGaussianBlur stdDeviation="5" />

               
        </filter>


            <filter id="specLight1">
                <feSpecularLighting
                    result="specOut"
                    specularExponent="20"
                    lighting-color="#545454">
                    <fePointLight x={param.emitterPos[0]} y={param.emitterPos[1]} z="50" />
                </feSpecularLighting>

                {/**The feComposite element is what creates a stencil outline to contain the speclighting from leaking out (by using the source SVG as the frame) */}
                <feComposite
                    in="SourceGraphic"
                    in2="specOut"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0" />


            </filter>

            
        </g>
    )


}

export default Emitter;