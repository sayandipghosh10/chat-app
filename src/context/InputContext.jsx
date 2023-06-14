import { createContext, useState } from "react";


export const InputContext = createContext();

export const InputContextProvider = ({ children }) => {

    const[checkBlankMsg,setCheckBlankMsg]=useState(false);
    const[checkUserSelectOrNotBasedOnInputComponentShow,setCheckUserSelectOrNotBasedOnInputComponentShow]=useState(false);

    return (
        <InputContext.Provider value={{ checkBlankMsg,setCheckBlankMsg,checkUserSelectOrNotBasedOnInputComponentShow,setCheckUserSelectOrNotBasedOnInputComponentShow}}>
            {children}
        </InputContext.Provider>
    );

}