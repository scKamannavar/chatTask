import  axios from "axios";
import { API } from "../../../Constants";

export const sendMessageApi = (message) =>{
    // alert('First Render'+`${API}message/add-message`)
 return   axios.post(
        `${API}message/add-message`,
        {
            message: message,
        },
    );
}