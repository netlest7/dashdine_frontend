import { configureStore } from '@reduxjs/toolkit'
import ownerReducer from './reducer/userReducer/userReducer'
import storeReducer from './reducer/storeReducer'
import updateStoreReducer from './reducer/updateStoreReducer'


export const store = configureStore({
  reducer: {
    owner: ownerReducer,
    store: storeReducer,
    updateStore: updateStoreReducer
  },
})


