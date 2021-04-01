// Reducer to capture the location Data. This will be used to set the cityname as well as set the country

const INITIAL_STATE = {
    cityName: null
}

const locationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CITY":
            return {
                ...state,
                cityName: action.payload 
            }
        case "SET_COUNTRY":
            return {
                ...state,
                country: action.payload,
            }
        default: 
            return state;
    }
}

export default locationReducer;