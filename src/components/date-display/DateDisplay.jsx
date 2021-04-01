//Component takes a unix epoch datetime and converts to formatted time and displays it 
import React from "react";
import {connect} from "react-redux";
import moment from "moment";

function DateDisplay(props){
    const unixDate = props.date;
    // Convert to a format "Day, Month Date, Year hours:minutes:Seconds AM/PM"
    const fetchDate = moment.unix(unixDate).format('dddd, MMMM Do, YYYY h:mm:ss A');

    return (
        <h2>{fetchDate}</h2>
    )
}

// Pick the current date stored within Redux as the date of fetching
const mapStateToProps = (state) => ({
    date: state.date.fetchDate
})

export default connect(mapStateToProps)(DateDisplay);