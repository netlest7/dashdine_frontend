import {
    Card,
    CardDescription,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"

import logo from "../../assets/logo.png"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react"
import { createStoreOwner } from "@/redux/actions/storeActions"
import { useDispatch, useSelector } from "react-redux"
import { updateOwner } from "@/redux/actions/updateOwnerActions"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const OwnerDetails = ({owner}) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName,setFullName] = useState("")
  const [phoneNumber,setPhoneNumber] = useState()
  const [aadharcard,setAadharCard] = useState()
  const [restaurantName,setRestaurantName] = useState("")
  const [storeOpenTime,setStoreOpenTime] = useState()
  const [numberOfTables,setNumberOfTables] = useState()
  const [storeCloseTime,setStoreCloseTime] = useState()
  // const [restaurantLicenseNumber,setRestaurantLicenseNumber] = useState()
  const [selectedImage, setSelectedImage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [imageFile, setImageFile] = useState('');
 // eslint-disable-next-line no-unused-vars
 const {loading,store,message} = useSelector(state => state.createStore)

  const handleImageChange = (e) => {

      
      const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
    
  }
 

  const submitHandler = () => {
    // for user
    const owner_name = fullName
    const owner_phoneNumber = phoneNumber
    const owner_aadharCard = aadharcard

      // eslint-disable-next-line react/prop-types
      const owner_email = owner.owner_email

      
    // const formData = new FormData();
    // if (imageFile) {
    //   console.log("andar hu");
    //   formData.append("file", imageFile);
    // }

    // for store

    dispatch(createStoreOwner(restaurantName,numberOfTables,storeOpenTime,storeCloseTime,selectedImage))

    // user
    dispatch(updateOwner(owner_name,owner_email,owner_phoneNumber,owner_aadharCard))

  }

  useEffect(() => {
    if(owner){
      // eslint-disable-next-line react/prop-types
      setFullName(owner?.owner_name)
      
    }
  }, [owner])

  useEffect(() => {

  if(message){
    toast.success(message)
    setFullName("")
      setPhoneNumber()
      setAadharCard()
      setRestaurantName("")
      setStoreOpenTime()
      setNumberOfTables()
      setStoreCloseTime()
      setSelectedImage("")
      setImageFile("")
      setTimeout(() => {
        navigate("/plans")
      }, 1000);
  }
   
  }, [message])
  
  
  return (
    !loading ? <div className="w-screen h-screen bg-black flex items-center flex-col overflow-y-auto">
    <div className="w-full p-4">
        <img src={logo} height={150} width={150}/>
    </div>

    <h2 className='text-white text-3xl mb-6'>Owner Details</h2>
    <Toaster/>
    <Card className='bg-transparent w-[90%] flex justify-center gap-11 p-10 flex-wrap'>


           <div className='w-[40%]'>
           <h3 className='text-white'>Full Name</h3>
            <CardDescription>
            <Input className='text-amber-400 placeholder:text-slate-500 '  placeholder='Enter the name of the owner ...' value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
            </CardDescription>
           </div>


           <div className='w-[40%]'>
           <h3 className='text-white'>Mobile Number</h3>
            <CardDescription>
            <Input className='text-amber-400 placeholder:text-slate-500' placeholder='+91 XXXXXXXXXX' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
            </CardDescription>
           </div>



          <div className='w-[40%]'>
          <h3 className='text-white'>Aadharcard Number</h3>
            <CardDescription>
            <Input className='text-amber-400 placeholder:text-slate-500'   placeholder='23284343050338984' value={aadharcard} onChange={(e)=> setAadharCard(e.target.value)}/>

            </CardDescription>
          </div>


    </Card>

    <h2 className='text-white mb-6  mt-6 text-3xl'>Restaurant Details</h2>

    <Card className='bg-transparent w-[90%] flex justify-center gap-11 p-10 flex-wrap'>

    <div className='w-[40%]'>
    <h3 className='text-white'>Restaurant Name</h3>
    <CardDescription>
    <Input className='text-amber-400 placeholder:text-slate-500'  placeholder='Enter the name of the restaurant ...' value={restaurantName} onChange={(e)=> setRestaurantName(e.target.value)}/>
    </CardDescription>
    </div>


    <div className='w-[40%]'>
    <h3 className='text-white'>Restaurant Open Time</h3>
    <CardDescription>
    <Input className='text-amber-400 placeholder:text-slate-500' placeholder='Enter the address of the restaurant ...' value={storeOpenTime} onChange={(e)=> setStoreOpenTime(e.target.value)}/>
    </CardDescription>
    </div>



    <div className='w-[40%]'>
    <h3 className='text-white'>Number of Tables</h3>
    <CardDescription>
    <Input className='text-amber-400 placeholder:text-slate-500'   placeholder='Enter the number of tables in the restaurant ...' value={numberOfTables} onChange={(e)=> setNumberOfTables(e.target.value)}/>

    </CardDescription>
    </div>

    <div className='w-[40%]'>
    <h3 className='text-white'>Restaurant Closing Time</h3>
    <CardDescription>
    <Input className='text-amber-400 placeholder:text-slate-500'   placeholder='Enter the GST number of the restaurant' value={storeCloseTime} onChange={(e)=> setStoreCloseTime(e.target.value)}/>
    </CardDescription>
    </div>

    {/* <div className='w-[40%]'>
    <h3 className='text-white'>Restaurant Licence Number</h3>
    <CardDescription>
    <Input className='text-amber-400 placeholder:text-slate-500' placeholder='Enter the licence number of the restaurant' value={restaurantLicenseNumber} onChange={(e)=> setRestaurantLicenseNumber(e.target.value)}/>
    </CardDescription>
    </div> */}

    <div className='w-[40%]'>
    <h3 className='text-white'>Logo</h3>
    <CardDescription>
    <Input className='text-amber-400 w-[30%] bg-gradient-to-b cursor-pointer from-yellow-300 placeholder:text-slate-500 to-orange-400 border border-yellow-600' type='file' accept="image/*" onChange={handleImageChange}/>
    {selectedImage && (
      
        <img src={selectedImage} alt="Selected Profile" style={{ width: '200px', height: '200px', objectFit: 'cover' }} className="border mt-5 rounded-lg" />

  )}
    </CardDescription>
    </div>
    </Card>

<Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 
rounded-md text-black mt-7 mb-8' onClick={submitHandler} >Register</Button>

</div>  : <>loading</>
   
  )
}

export default OwnerDetails