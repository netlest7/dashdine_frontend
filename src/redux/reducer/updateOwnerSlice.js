import  {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    message: ""
}


const updateOwnerSlice = createSlice({
    name:"updateOwner",
    initialState,
    reducers: {
        updateOwnerRequest : (state) => {
            state.loading = true
        },
        updateOwnerSuccess : (state,action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        clearMessages : (state) => {
            state.loading = false;
            state.message = ""
        }
    }

})
    
export const {updateOwnerRequest,updateOwnerSuccess,clearMessages} = updateOwnerSlice.actions;
export default updateOwnerSlice.reducer