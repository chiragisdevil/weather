import React from "react";
import WeatherCard from "../weather-card/WeatherCard";
import "./card-container.scss";
import moment from "moment";

function CardContainer({forecast}){
    console.log(forecast); 
    let dailyRecord = null;
    if (forecast){
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

