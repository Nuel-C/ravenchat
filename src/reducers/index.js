import userReducer from "./user";
import isLoggedIn from "./isLoggedIn";
import showForm from "./showForm";
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    userReducer: userReducer,
    isLoggedIn: isLoggedIn,
    showForm: showForm
})

export default allReducers