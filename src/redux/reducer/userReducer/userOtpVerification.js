import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    loading : false,
    otpRegMessage: "",

}

export const ownerOtpVerificationSlice = createSlice({
    name: "owner_otp_verification",
    initialState,
    reducers: {
        ownerTokenVerificationRequest : (state) => {
            state.loading = true
        },
        ownerTokenVerificationSuccess : (state,action) => {
            state.loading = false;
            state.otpRegMessage = action.payload.message;
        },
        clearUserMessagesOTP : (state) => {
            state.otpRegMessage = ""
         }
    }
})

export const {ownerTokenVerificationRequest, ownerTokenVerificationSuccess,clearUserMessagesOTP} = ownerOtpVerificationSlice.actions;
export default ownerOtpVerificationSlice.reducer;