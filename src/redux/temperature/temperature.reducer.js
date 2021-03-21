const INITIAL_STATE = {
    temp: null
}

const tempReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TEMP":
            return {
                ...state,
                temp: action.payload 
            }
        default: 
            return state;
    }
}

export default tempReducer;