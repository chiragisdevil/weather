// Individual Weather card component that displays the weather information for the day

import React from "react";
import "./weather-card.scss";
import WeatherIcon from "../weather-icon/WeatherIcon";

function WeatherCard(props){
    return(
        <div className="card-container">
            <h1>{props.day}</h1>
            {/* Display the weather icon based on the icon value returned */}
            <WeatherIcon 
                icon = {props.icon}
            />
            {/* Display the rounded min and max temp in celsius. API already returns data in celsius */}
            <h4>{"Min:" + Math.round(props.Min)+"\u00b0C"} </h4>
            <h4> {"Max:" + Math.round(props.Max)+"\u00b0C"}</h4>
            {/* Description of the weather to be shown. Eg. Clear sky */}
            <p>{props.description}</p>
        </div>
    )
}

export default WeatherCard;