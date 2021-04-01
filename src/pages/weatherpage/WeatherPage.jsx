import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import GetWeatherDetails from "./getWeatherData";
import "./weather-page.scss";
import {Link, withRouter} from "react-router-dom";

/* Other Component Imports */
import DateDisplay from "../../components/date-display/DateDisplay";
import GeneralWeather from "../../components/general-weather/GeneralWeather";
import CardContainer from "../../components/card-container/CardContainer";
import Button from "../../components/button/Button";
import WeatherIcon from "../../components/weather-icon/WeatherIcon";

/* Redux Imports */
import {setCountryAction} from "../../redux/location/location.action";
import {setDateAction} from "../../redux/date/date.action";
import {setTempAction} from "../../redux/temperature/temperature.action";
import {setIconAction} from "../../redux/icon/icon.action";

function WeatherPage(props){
    const cityName = props.cityName;
    const history = props.history;
    // Used hooks to store the weather data
    const [weatherData, setWeatherData] = useState();
    const dispatch = useDispatch();
    
    //Fetch weatherdata and store. Pass cityname as input & store the weather data within a fetchedData variable 
        useEffect(() => // function will run only once after it has mounted. 
            {
                const fetchedData = GetWeatherDetails(cityName)
                fetchedData.then(result => setWeatherData(result))
                .catch((err) => history.push("/"))
            }, [cityName, history]
        );
        
        if (weatherData && weatherData.cod!=="404") { 
            // Note- The data stored into redux for reference purposes in case we need to use this data for other components such as General weather
            // to use & other components in future

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

            // Destructure the temperature data
            // const {feels_like, temp, temp_max, temp_min, humidity} = props.temperature;

        } 

    return(
        <div className="weatherPage">
            <div className="topItems"> 
                <h2>{props.cityName + "  " + props.country}</h2>
            {/* Weather Icon will be dynamically pulled from Open Weather Map using an API call within the WeatherIcon component */}
                <WeatherIcon icon = {props.icon?props.icon:"01n"}/>
            {/* Display the Very first date returned from the Open weather map API. Note - This is not necessarily the current date */}
                <DateDisplay />
                {/* Display temperature which is retrieved from the API in degrees celsius. Add the symbol to it */}
                <h1 className="temperature">{props.temperature?Math.round(props.temperature.temp) + "\u00b0C":null}</h1>
            </div>
            {/* Display general weather details such as Feels like  */}
            <div className="keyitems">
                <GeneralWeather />
            </div>
            
            {/* Card Container is the container holding all the individual weather cards. These are being passed as props instead of redux*/}
            <CardContainer 
                forecast = {weatherData? weatherData.list: null}
            /> 
            <div className="btn">
            {/* Create a Start Again button allowing to navigate back to the homepage */}
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