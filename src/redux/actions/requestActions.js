import { GET_REQUEST_DATA } from "./types";

export const getRequestData = () => dispatch => {
    dispatch({ type: GET_REQUEST_DATA });
};