import { storeOrderRequest, storeOrderSuccess } from "../reducer/storeOrderSlice";
import axios from "axios"

const url = "http://localhost:4000/api/v1"


export const getAllStoreOrders = (storeId) => async(dispatch)=> {
        try {
                dispatch(storeOrderRequest());

                const {data} = await axios.get(`${url}/getAllOrders/${storeId}`)
                 console.log(data);
                dispatch(
                    storeOrderSuccess({
                        orders: data.orders
                    })
                )
        } catch (error) {
            console.log(error);
        }
}

