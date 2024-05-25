import axios from "axios";
import { loadUserFail, loadUserSuccess, ownerLoginFail, ownerLoginRequest, ownerLoginSuccess, ownerLogoutSuccess } from "../reducer/userReducer/userReducer";
import { clearUserMessages, ownerRegisterRequest, ownerRegisterSuccess} from "../reducer/userReducer/userRegisterReducer";
import { ownerTokenVerificationRequest, ownerTokenVerificationSuccess } from "../reducer/userReducer/userOtpVerification";

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

export const logoutOwner = () => async(dispatch) => {
    try {
           await axios.get(`${url}/logout`,{
                withCredentials: true
            })

            dispatch(
                ownerLogoutSuccess()
            )
    } catch (error) {
            console.log(error.message);
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


export const registerOwner = (name,email,password) => async(dispatch) => {
   
    try{
        const sdata = {
            owner_email: email,
            owner_name: name,
            owner_password: password
        }
        dispatch(ownerRegisterRequest());

        const {data} = await axios.post(`${url}/signup`,sdata,{withCredentials: true})
        console.log(data,"owner Register Lund");
        dispatch(
            ownerRegisterSuccess({
                activationToken: data.activationToken,
                message: data.message
            })
        )
    }catch(error){
        console.log(error.response.data);
    }
}

export const ownerAccountVerificationWithOtp = (activationCode,token) => async(dispatch) => {
   
    try{
        dispatch(clearUserMessages())
       dispatch(
        ownerTokenVerificationRequest()
       )
        const {data} = await axios.post(`${url}/activateUser`,{token,activationCode})
        dispatch(
            ownerTokenVerificationSuccess({
                message: data.message,
            })
        )
        console.log(data,"owner otp registration Lund");
        
    }catch(error){
        console.log(error.response.data);
    }
}