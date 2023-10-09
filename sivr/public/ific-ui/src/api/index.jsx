import Axios from "axios";
import {API_URL} from "../config/Constants";

export const apiCall = async (url, data) => {
    try {
        const response = await Axios.post(API_URL + url, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("ErrorPage Occured:");
        console.log(error);
    }
}
