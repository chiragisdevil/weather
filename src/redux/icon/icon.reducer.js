// Reducer to capture the icon details

const INITIAL_STATE = {
    icon: null
}

const iconReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ICON":
            return {
                ...state,
                icon: action.payload 
            }
        default: 
            return state;
    }
}

export default iconReducer;