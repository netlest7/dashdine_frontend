import axios from "axios";
import { updateOwnerRequest, updateOwnerSuccess } from "../reducer/updateOwnerSlice";

const url = "http://localhost:4000/api/v1"


export const updateOwner = (owner_name,owner_email,owner_phoneNumber,owner_aadharCard) => async(dispatch) => {

    try {
         dispatch(updateOwnerRequest())

         const {data} = await axios.put(`${url}/updateUser`,{
            owner_name,owner_email,owner_phoneNumber,owner_aadharCard
         },{
            headers: {
                'Content-type': 'application/json',
              },
            withCredentials: true
         })

         dispatch(updateOwnerSuccess({
            message: data.message
         }))
    } catch (error) {
        console.log(error);
    }
}