import React from "react";
import {connect} from "react-redux";
import "./general-weather.scss";
// feels_like,  temp_max, temp_min, humidity
function GeneralWeather(props){
    const feel_like = props.temperature? Math.round(props.temperature.feels_like): null;
    const temp_max = props.temperature? Math.round(props.temperature.temp_max): null;
    const temp_min = props.temperature? Math.round(props.temperature.temp_min): null;
    const humidity = props.temperature? props.temperature.humidity: null;
    return(
        <div className="general">
            <p className="para">{"Feel Like: " + feel_like+"\u00b0C"}</p>
            <p className="para">{"Max Temperature: " + temp_max+"\u00b0C"}</p>
            <p>{"Min Temperature: " + temp_min+"\u00b0C"}</p>
            <p>{"Humidity: " + humidity+"%"}</p>
        </div>
        
    )
}

const mapStateToProps= (state) => ({
    temperature: state.temperature.temp
})

export default connect(mapStateToProps)(GeneralWeather);