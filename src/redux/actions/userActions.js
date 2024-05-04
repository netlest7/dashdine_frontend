import axios from "axios";
import { loadUserFail, loadUserSuccess, ownerLoginFail, ownerLoginRequest, ownerLoginSuccess } from "../reducer/userReducer/userReducer";

// const url = "https://dash-dine.onrender.com/api/v1"
const url = "http://localhost:4000/api/v1"

export const loginOwner = (email,password) => async(dispatch) => {
    const sdata = {
        owner_email:email,
        owner_password:password
    }
    try {
            dispatch(
                ownerLoginRequest()
            )
            const {data} = await axios.post(`${url}/loginOwner`,sdata,{
                withCredentials: true
            })
            console.log(data.owner,"lund");
            dispatch(
                ownerLoginSuccess({
                    accessToken: data.accessToken,
                    owner: data.owner,
                })
            )
    } catch (error) {
          dispatch(ownerLoginFail());
            console.log(error);
    }
}


export const refreshAccessToken = () => async() => {
    try {
            
            const {data} = await axios.get(`${url}/activateToken`,{
                withCredentials: true
            })
             console.log(data,"refreshToken");
    } catch (error) {
         
            console.log(error);
    }
}

export const loadOwner = () => async(dispatch) => {
    try {
            // dispatch(
            //   loadUserRequest()
            // )
            const {data} = await axios.get(`${url}/me`,{
                withCredentials: true
            })
            console.log(data.owner,"lund");
            dispatch(
                loadUserSuccess({
                    accessToken: data.accessToken,
                    owner: data.owner,
                })
            )
    } catch (error) {
          dispatch(loadUserFail());
            console.log(error);
    }
}