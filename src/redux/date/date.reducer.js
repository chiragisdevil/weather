// Reducer to capture the fetch Date

const INITIAL_STATE = {
    fetchDate: null
}

const dateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_DATE":
            return {
                ...state,
                fetchDate: action.payload 
            }
        default: 
            return state;
    }
}

export default dateReducer;