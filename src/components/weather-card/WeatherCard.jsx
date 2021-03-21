import React from "react";
import "./weather-card.scss";
import WeatherIcon from "../weather-icon/WeatherIcon";

function WeatherCard(props){
    return(
        <div className="card-container">
            <h1>{props.day}</h1>
            <WeatherIcon 
                icon = {props.icon}
            />
            <h4>{"Min:" + Math.round(props.Min)+"\u00b0C"} </h4>
            <h4> {"Max:" + Math.round(props.Max)+"\u00b0C"}</h4>
            <p>{props.description}</p>
        </div>
    )
}

export default WeatherCard;