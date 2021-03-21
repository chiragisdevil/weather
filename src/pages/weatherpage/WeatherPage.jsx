import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import GetWeatherDetails from "./getWeatherData";
import DateDisplay from "../../components/date-display/DateDisplay";
import GeneralWeather from "../../components/general-weather/GeneralWeather";
import CardContainer from "../../components/card-container/CardContainer";
import Button from "../../components/button/Button";
import {setCountryAction} from "../../redux/location/location.action";
import {setDateAction} from "../../redux/date/date.action";
import {setTempAction} from "../../redux/temperature/temperature.action";
import {setIconAction} from "../../redux/icon/icon.action";
import "./weather-page.scss";
import WeatherIcon from "../../components/weather-icon/WeatherIcon";
import {Link, withRouter} from "react-router-dom";

function WeatherPage(props){
    const cityName = props.cityName;
    const history = props.history;

    const [weatherData, setWeatherData] = useState();
    const dispatch = useDispatch();
    
        // const feels_like = null;
        // const temp = null;
        // const temp_max = null;
        // const temp_min = null;
        // const humidity = null;
    
    //Fetch weatherdata and store {
        useEffect(() => // function will run only once after it has mounted. 
            {
                const fetchedData = GetWeatherDetails(cityName)
                fetchedData.then(result => setWeatherData(result))
                .catch((err) => history.push("/"))
            }, [cityName, history]
        );
        
        if (weatherData && weatherData.cod!=="404") { 
            //Fetch Location information from the fetched data and dispatch country action to trigger the reducer
            const {city: {country:countryName}} = weatherData;
            dispatch(setCountryAction(countryName));

            //As list is a 3 hourly array, we will use the first one as the current
            const current = weatherData.list[0];
           
            //Dispatch setDate action
            const {dt: dateDetails} = current;
            dispatch(setDateAction(dateDetails));

            //Dipatch setTemperature Action
            const {main: tempDetails} = current;
            dispatch(setTempAction(tempDetails));

            //Dipatch setIcon Action
            const {weather:[{icon: iconDetails}] } = current;
            dispatch(setIconAction(iconDetails));

            // //Destructure the temperature data
            // const {feels_like, temp, temp_max, temp_min, humidity} = props.temperature;

        } 

        // feels_like, temp, temp_max, temp_min, humidity
    return(
        <div className="weatherPage">
            <div className="topItems"> 
                <h2>{props.cityName + "  " + props.country}</h2>
                <WeatherIcon icon = {props.icon?props.icon:"01n"}/>
                <DateDisplay />
                <h1 className="temperature">{props.temperature?Math.round(props.temperature.temp) + "\u00b0C":null}</h1>
            </div>
            <div className="keyitems">
                <GeneralWeather />
            </div>
            
            <CardContainer 
                forecast = {weatherData? weatherData.list: null}
            /> 
            <div className="btn">
            <Link to="/">
                <Button>Start Again</Button>
            </Link>
            </div> 
        </div>
    )
}

const mapStateToProps= (state) => ({
    cityName : state.location.cityName,
    country  : state.location.country,
    temperature: state.temperature.temp,
    icon: state.icon.icon
})

export default connect(mapStateToProps)(withRouter(WeatherPage));