import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    store: "",
}

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        loadStoreRequest: (state) => {
                state.loading = true
        },
        loadStoreSuccess: (state,action) => {
                state.loading = false,
                state.store = action.payload.store
        },
       
        loadStoreFail: (state) => {
                state.loading = true
        },
       
        }
    
})

export const {loadStoreRequest,loadStoreSuccess,loadStoreFail} = storeSlice.actions;
export default storeSlice.reducer;