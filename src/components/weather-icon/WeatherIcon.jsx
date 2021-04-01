//Component takes a character string as an input and returns an image retrived from openweathermap
import React from "react";

function WeatherIcon({icon}){
    // API call to open weather map to get the icon image based on the icon value provided
    return(
        <img src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt="Weather"/>
    )
}

export default WeatherIcon;