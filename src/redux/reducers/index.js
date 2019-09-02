import { combineReducers } from "redux";
import RequestReducer from "./requestReducer";


export default combineReducers({
    request: RequestReducer // this will be the name we use to access this reducer
});