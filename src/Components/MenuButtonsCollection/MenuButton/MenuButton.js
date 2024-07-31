import './Styles_MenuButton.css';

function MenuButton(param){

    const divStyle = {

        color: 'blue',
        border: '5px solid red',
        backgroundColor: 'lightgray',

    };
 

    let currCoords = param.buttonObject.coords;
    let currTitle = param.buttonObject.title;

    return(
        <g>
            <rect fill='transparent' x={currCoords[0]} y={currCoords[1]} width={50} height={50} stroke="green" strokeWidth={2}></rect>
            <text x={currCoords[0]} y={currCoords[1]}  className='ButtonText' >{currTitle}</text>
        </g>

      
   
      
    )



}


export default MenuButton;