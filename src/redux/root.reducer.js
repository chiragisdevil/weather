import {combineReducers} from "redux";
import locationReducer from "./location/location.reducer";
import dateReducer from "./date/date.reducer";
import tempReducer from "./temperature/temperature.reducer";
import iconReducer from "./icon/icon.reducer";

export default combineReducers({
    location: locationReducer,
    date: dateReducer,
    temperature: tempReducer,
    icon: iconReducer
})
