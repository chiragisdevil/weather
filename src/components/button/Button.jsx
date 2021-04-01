// Displays a styled button. Takes children to support different text

import React from "react";
import "./button.scss";

function Button({children}){
    return(
        <button className= "custom-button">{children}</button>
    )
}

export default Button;