//Component takes a character string as an input and returns an image retrived from openweathermap
import React from "react";

function WeatherIcon({icon}){
    
    return(
        <img src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt="Weather"/>
    )
}

export default WeatherIcon;