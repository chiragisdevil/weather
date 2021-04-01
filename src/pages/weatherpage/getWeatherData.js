//  API Call to open weather map. This takes the city name as the input and returns weather data

function GetWeatherDetails(cityName){

    // const [weatherData, setWeatherData] = useState();
    
    const location = cityName;
    const appid = "130cafda2bd3fbbd46be177ba93d3cc9";
    const url = "https://api.openweathermap.org/data/2.5/forecast?q="+ location + "&appid=" + appid + "&units=metric";

    const weatherData = fetch(url)
    .then(data => data.json());

    return weatherData;

}

export default GetWeatherDetails;


