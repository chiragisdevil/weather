// Container of the list of weather cards. This will list down a card for each day starting today. 
// Takes the forecast data as an input props, which is used to render the data

import React from "react";
import WeatherCard from "../weather-card/WeatherCard";
import "./card-container.scss";
import moment from "moment";

function CardContainer({forecast}){
    let dailyRecord = null;
    if (forecast){
    // The API does not return data for the entire day & so we will sample the data at specific points in the day. We will take mutiples of 8 to get next day's data
        dailyRecord = forecast.filter((item, index) => (index % 8 === 0))
    } 


    return(
        <div className="card-list">
            {dailyRecord? 
                dailyRecord.map(
                    (cardItem) => <WeatherCard  
                                key={moment.unix(cardItem.dt).format('dddd')}
                                day={moment.unix(cardItem.dt).format('dddd')}
                                Min={cardItem.main.temp_min}
                                Max={cardItem.main.temp_max}
                                icon={cardItem.weather[0].icon}
                                description = {cardItem.weather[0].description} 
                />):
                null
            }
            
        </div>
    )
}

export default CardContainer;

