import MenuButton from "./MenuButton/MenuButton";
import './Styles_MenuButtonsCollection.css';
function MenuButtonsCollection(param){



    


        return(
            <g>
            <rect fill="transparent" width={100} height={100} stroke="blue" strokeWidth={5}> </rect>
                {param.menuButtonsArr.map((currButton, ix)=>{
                    return <MenuButton buttonObject={currButton} />
                })}
            </g>
        )
    

}

export default MenuButtonsCollection;