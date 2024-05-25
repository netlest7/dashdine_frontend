import { configureStore } from '@reduxjs/toolkit'
import ownerReducer from './reducer/userReducer/userReducer'
import storeReducer from './reducer/storeReducer'
import updateStoreReducer from './reducer/updateStoreReducer'
import storeOrderReducer from './reducer/storeOrderSlice'
import updateOwnerReducer from "./reducer/updateOwnerSlice"
import  ownerRegisterReducer  from './reducer/userReducer/userRegisterReducer'
import ownerOtpVerificationReducer from './reducer/userReducer/userOtpVerification'
import createStoreReducer from './reducer/createStoreReducer'

export const store = configureStore({
  reducer: {
    owner: ownerReducer,
    store: storeReducer,
    ownerRegister: ownerRegisterReducer,
    updateStore: updateStoreReducer,
    storeOrders: storeOrderReducer,
    updateOwner: updateOwnerReducer,
    otpVerification: ownerOtpVerificationReducer,
    createStore: createStoreReducer
  },
})


