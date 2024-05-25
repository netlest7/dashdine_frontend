import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    loading : false,
    store : "",
    message: ""
}

export const createStoreSlice = createSlice({
    name:"create_store",
    initialState,
    reducers:{
        createStoreRequest : (state) => {
            state.loading = true
        },
        createStoreSuccess : (state,action) => {
            state.loading = false;
            state.store = action.payload.store;
            state.message = action.payload.message;
        }
    }
})

export const {createStoreRequest,createStoreSuccess}  = createStoreSlice.actions;
export default createStoreSlice.reducer;