// Create the action setDateAction that allows us to use the type of SET_DATE to identify the action. Can be moved to a separate property file to hold all actions
export const setDateAction = (date) => ({
    type: "SET_DATE",
    payload: date
})