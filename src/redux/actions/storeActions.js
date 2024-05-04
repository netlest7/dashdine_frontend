import axios from "axios";
import { loadStoreRequest, loadStoreSuccess } from "../reducer/storeReducer";
import { updateMenuRequest, updateMenuSuccess } from "../reducer/updateStoreReducer";

// const url = "https://dash-dine.onrender.com/api/v1"
const url = "http://localhost:4000/api/v1"



export const getStoreById = (storeId) => async(dispatch) => {

    try {
            dispatch(
                loadStoreRequest()
            )
            const resutl = await axios.get(`${url}/getStore/${storeId}`,{
                withCredentials:true
            })
            console.log(resutl.data,"axios => getStore");
            dispatch(
                loadStoreSuccess({
                    store: resutl.data.store
                })
            )
    } catch (error) {
            console.log(error);
    }
}


// update menu

export const updateMenu = (storeId,category,items) => async(dispatch) => {
    try {
        dispatch(updateMenuRequest())
        const data = await axios.post(`${url}/createMenu/${storeId}`,{
            category,
            items
        },{
            withCredentials: true
        })

        dispatch(updateMenuSuccess({
            message: data.data.message,
            menu: data.data.menu
        }))
        console.log(data,"<-update menu");
    } catch (error) {
        console.log(error);
    }
}