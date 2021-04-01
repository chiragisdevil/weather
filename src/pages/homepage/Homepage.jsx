// This is the homepage of the application that holds a simple image and an option to provide the name of the city

import React from "react";
import Footer from "../../components/footer/Footer";
import SearchBox from "../../components/search-box/SearchBox";
import homepageimg from "../../assets/homepageimg.jpg"; 
import "./homepage.scss";
import {useDispatch} from "react-redux";
import {setCityAction} from "../../redux/location/location.action";

function Homepage(){
    const dispatch = useDispatch();

    // Trigger the action to store the cityname into redux
    function setCity(city){
        return(
            dispatch(setCityAction(city))
        )
    }

    return (
        <div className="homepage">/
            <h1 className="title">Weather Hunter</h1>
            <div>
            {/* Homepage image from the assets */}
                <img src={homepageimg} alt = "Background" className="homepageimg" />
            </div>
            {/* Custom resuable searchbox component allowing to take dynamic properties an inputs */}
            <SearchBox className="search-box"
               placeholder = "City Name"
               setSearchedItem = {setCity}
               navigate = {"/weather"}
            />
              
            <Footer />
        </div>
    )
}

export default Homepage;