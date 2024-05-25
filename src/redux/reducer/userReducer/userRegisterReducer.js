import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    loading : false,
    message: "",
    activationToken: ""
}

export const ownerRegisterSlice = createSlice({
    name: "owner_register",
    initialState,
    reducers: {
        ownerRegisterRequest : (state) => {
            state.loading = true;
        },
        ownerRegisterSuccess : (state,action) => {
            state.loading = false;
            state.activationToken = action.payload.activationToken;
            state.message = action.payload.message;
        },
        clearUserMessages : (state) => {
           state.message = ""
           state.activationToken = ""
        }
      
    }
})

export const {ownerRegisterRequest,ownerRegisterSuccess,clearUserMessages} = ownerRegisterSlice.actions;
export default ownerRegisterSlice.reducer;