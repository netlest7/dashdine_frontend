import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    orders: [],
    error: ""
}
const storeOrdersSlice = createSlice({
    name: "storeOrders",
    initialState,
    reducers:{

        storeOrderRequest: (state) =>{
            state.loading = true
        },
        storeOrderSuccess: (state,action) => {
            state.loading = false,
            state.orders = action.payload.orders

        },
        storeOrderFail: (state,action) => {
            state.loading = false,
            state.error = action.payload.error
        }

    }
})

export const {storeOrderRequest,storeOrderSuccess,storeOrderFail} = storeOrdersSlice.actions
export default storeOrdersSlice.reducer;