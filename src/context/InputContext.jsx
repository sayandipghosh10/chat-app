import { createContext, useState } from "react";


export const InputContext = createContext();

export const InputContextProvider = ({ children }) => {

    // const[checkBlankMsg,setCheckBlankMsg]=useState(false);
    const[checkUserSelectOrNotBasedOnInputComponentShow,setCheckUserSelectOrNotBasedOnInputComponentShow]=useState(false);
    const[uploadSuccessMessagePopup, setUploadSuccessMessagePopup] = useState(false);

    return (
        <InputContext.Provider value={{checkUserSelectOrNotBasedOnInputComponentShow,setCheckUserSelectOrNotBasedOnInputComponentShow,uploadSuccessMessagePopup, setUploadSuccessMessagePopup}}>
            {children}
        </InputContext.Provider>
    );

}