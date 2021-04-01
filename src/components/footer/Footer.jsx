// Created a simple footer to copyright the code
import React from "react";
import "./footer.css";

function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>Made with 💗 by Chirag Walia</p>
            <p>Copyright ⓒ {year}</p>
        </footer>  
    )
}

export default Footer;