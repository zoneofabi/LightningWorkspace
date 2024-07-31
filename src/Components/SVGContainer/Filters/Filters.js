function Filters(){
    return(
        <defs>
        <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
        </filter>

            <filter id="blur2">
                <feGaussianBlur stdDeviation="1" />
            </filter>

     
                 <filter id="black-glow">
          
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>
    )
}


export default Filters;