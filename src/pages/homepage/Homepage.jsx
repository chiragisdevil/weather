import React from "react";
import Footer from "../../components/footer/Footer";
import SearchBox from "../../components/search-box/SearchBox";
import homepageimg from "../../assets/homepageimg.jpg"; 
import "./homepage.scss";
import {useDispatch} from "react-redux";
import {setCityAction} from "../../redux/location/location.action";

function Homepage(){
    const dispatch = useDispatch();

    function setCity(city){
        return(
            dispatch(setCityAction(city))
        )
    }

    return (
        <div className="homepage">/
            <h1 className="title">Weather Hunter</h1>
            <div>
                <img src={homepageimg} alt = "Background" className="homepageimg" />
            </div>
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