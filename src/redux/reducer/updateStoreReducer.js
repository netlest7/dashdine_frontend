import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    menu: "",
    message: ""
}

const updateStoreSlice = createSlice({
    name:"updateStore",
    initialState,
    reducers: {
        
        updateMenuRequest: (state) => {
            state.loading = true
            state.menu = ""
            state.message = ""
        },
        updateMenuSuccess: (state,action) => {
            state.message = action.payload.message
            state.menu = action.payload.menu
            state.loading = false
        },
        updateMenuFail: (state,action) => {
            state.message = action.payload.success
            state.loading = false
        }
    }
})

export const {updateMenuRequest,updateMenuSuccess,updateMenuFail} = updateStoreSlice.actions;
export default updateStoreSlice.reducer;