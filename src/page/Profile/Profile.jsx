/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import { Sidebar } from '../HelpCompoents/Sidebar'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import toast, { Toaster } from 'react-hot-toast'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateOwner } from '@/redux/actions/updateOwnerActions'
import { loadOwner, logoutOwner } from '@/redux/actions/userActions'
import { clearMessages } from '@/redux/reducer/updateOwnerSlice'

// import { getStoreById } from '@/redux/actions/storeActions'

// import { useLoadStoreMutation } from '../../../redux/feature/cafe/cafeApi'

const Profile =({owner,loading}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {store} = useSelector(state=> state.store)
  const {message} = useSelector(state=> state.updateOwner)

  // const dispatch = useDispatch()
  const [fullName,setFullName] = useState(owner.owner_name)
  const [MobileNumber,setMobileNumber] = useState(owner.owner_phoneNumber)
  const [Email,setEmail] = useState(owner.owner_email)




  // store
  const [storeName,setStoreName] = useState("")
  const [storeNumberOfTables,setStoreNumberOfTables] = useState()
  const [storeOpenTime,setStoreOpenTime] = useState()
  const [logo,setLogo] = useState()
  const [storeCloseTime,setStoreCloseTime] = useState()

  const ownerUpdateHandler = () => {
    // owner_name,owner_email,owner_phoneNumber,owner_aadharCard
    const owner_name = fullName
    const owner_phoneNumber = MobileNumber
    const owner_email = Email
    dispatch(updateOwner(owner_name,owner_email,owner_phoneNumber))
  }

  const logoutHandler = () => {
    dispatch(logoutOwner())
    toast.success("Logout Successfull")
    setTimeout(() => {
    navigate("/")
    },1000);
  }

  useEffect(()=> {
    
    setFullName(owner.owner_name)
    setMobileNumber(owner.owner_phoneNumber)
    setEmail(owner.owner_email)
   
   
    if(store){
        setStoreName(store[0].store_name)
        setStoreNumberOfTables(store[0].store_NoOfTables)
        setStoreOpenTime(store[0].store_openTime)
        setStoreCloseTime(store[0].store_closeTime)
        setLogo(store[0].store_logo.url)

    }
  },[owner,loading,store,dispatch])


  useEffect(() => {
    if(message){
      toast.success(message)
      dispatch(clearMessages())
    dispatch(loadOwner())
    }    

  }, [message])

  return (
    
    !store ? <div className="flex flex-col bg-black w-screen h-screen items-center justify-center">
    <h3 className="text-white text-lg">Please Create Store First</h3>
    <Button className='bg-gradient-to-b from-yellow-300 mt-9 to-orange-400 border border-yellow-600 rounded-md text-black' onClick={()=>navigate('/ownerRegisteration')}>Create Store</Button>
  </div> :
    <div className='w-screen h-screen flex bg-black '>
    {/* side bar */}
    <Sidebar route={3}/>
    {/* side bar */}
        <div className="w-[80%] flex">
        <Toaster
        position="bottom-top"
        reverseOrder={false}
      />
      <ScrollArea className='flex flex-col items-center justify-center w-full p-11'> 
      <header className='w-full flex justify-between'>
          <h2 className='text-white text-xl hover:text-amber-300 cursor-pointer '>Owner Details</h2>
        <div className='flex gap-4'>
        {
          owner ?  <Button className='border' onClick={logoutHandler}>Logout</Button> : <></>
        }
          <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black' onClick={ownerUpdateHandler}>Save</Button>
        </div>
      </header>

      <Card className='bg-transparent w-[90%] mt-9 flex justify-center gap-11 p-10 flex-wrap'>


      <div className='w-[40%]'>
      <h3 className='text-white'>Full Name</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500 border '  placeholder='Enter the name of the owner ...' value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
      </CardDescription>
      </div>


      <div className='w-[40%]'>
      <h3 className='text-white'>Mobile Number</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500' placeholder='+91 XXXXXXXXXX' value={MobileNumber} onChange={(e)=> setMobileNumber(e.target.value)}/>
      </CardDescription>
      </div>


      <div className='w-[40%]'>
      <h3 className='text-white'>Email</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500'   placeholder='your@gmail.com' value={Email} onChange={(e)=> setEmail(e.target.value)}/>
      </CardDescription>
      </div>


      </Card>

     <header className='w-full mb-2 p-5'>
     <h2 className='text-white text-xl hover:text-amber-300 cursor-pointer ml-4 '>Restaurant Details</h2>
     </header>
      {/* Restaurant */}
      <Card className='bg-transparent w-[90%] flex justify-center gap-11 p-10 flex-wrap mb-4'>

      <div className='w-[40%]'>
      <h3 className='text-white'>Restaurant Name</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500' value={storeName} onChange={e=> setStoreName(e.target.value)} placeholder='Enter the name of the restaurant ...'/>
      </CardDescription>
      </div>


      <div className='w-[40%]'>
      <h3 className='text-white'>Number of Tables</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500' value={ storeNumberOfTables }  onChange={(e) => setStoreNumberOfTables(e.target.value)}  placeholder='Enter the number of tables in the restaurant ...'/>

      </CardDescription>
      </div>


      <div className='w-[40%]'>
      <h3 className='text-white'>Restaurant Opening Time</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500' value={storeOpenTime} onChange={(e) => setStoreOpenTime(e.target.value)} placeholder='Enter the opening time of the restaurant ...'/>
      </CardDescription>
      </div>



      

      <div className='w-[40%]'>
      <h3 className='text-white'>Restaurant Closing Time</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500'  value={storeCloseTime} onChange={(e) => setStoreCloseTime(e.target.value)}    placeholder='Enter the closing time of the restaurant'/>
      </CardDescription>
      </div>

      {/* <div className='w-[40%]'>
      <h3 className='text-white'>Restaurant Licence Number</h3>
      <CardDescription>
      <Input className='text-amber-400 placeholder:text-slate-500' placeholder='Enter the licence number of the restaurant'/>
      </CardDescription>
      </div> */}

      <div className='w-[40%] flex gap-9 justify-center items-center'>
      {/* <h3 className='text-white text-2xl'>Logo</h3> */}
      <CardDescription>
        <img src={logo} className='border-9  border-amber-300  rounded-[300%] h-[150px]' width={150} />
      {/* <Input className='text-amber-400 w-[35%] bg-gradient-to-b cursor-pointer from-yellow-300 placeholder:text-slate-500 to-orange-400 border border-yellow-600 center  ' placeholder="upload"   type='file'/> */}
      </CardDescription>
      </div>
      </Card>

  {/* subscription */}
      <Card className='bg-transparent w-[90%] flex justify-between gap-11 p-10 flex-wrap mb-11'>


      <div className='w-[40%]'>
      <h3 className='text-white text-xl'>Subscription Id</h3>
     
      </div>

      <Button className='rounded-md text-white bg-none border disabled'  onClick={()=>navigate("/plans")}>{owner.subscription === undefined ? "Plans" : `${owner.subscription.id}`}</Button>
      </Card>
        {/* <div className='w-full cursor-pointer flex justify-center'>
        </div> */}
      </ScrollArea>
      </div>
  
  
</div>
     
     )
    
  
}

export default Profile