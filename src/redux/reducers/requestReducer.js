import { GET_REQUEST_DATA } from "../actions/types";
import { apiCallData } from './data';
const initialState = {
    requestData: apiCallData
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_REQUEST_DATA: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
}
