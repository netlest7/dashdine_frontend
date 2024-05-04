/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import { Sidebar } from '../HelpCompoents/Sidebar'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from 'react-hot-toast'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import { getStoreById } from '@/redux/actions/storeActions'

// import { useLoadStoreMutation } from '../../../redux/feature/cafe/cafeApi'

const Profile =({owner,loading}) => {

  const navigate = useNavigate()
  const {store} = useSelector(state=> state.store)

  // const dispatch = useDispatch()
  const [fullName,setFullName] = useState(owner.owner_name)
  const [MobileNumber,setMobileNumber] = useState(owner.owner_phoneNumber)


  const [AadharCard,setAadharCard] = useState("")

  // store
  const [storeName,setStoreName] = useState("")
  const [storeNumberOfTables,setStoreNumberOfTables] = useState()
  const [storeOpenTime,setStoreOpenTime] = useState()
  const [storeCloseTime,setStoreCloseTime] = useState()


  useEffect(()=> {
    setFullName(owner.owner_name)
    setMobileNumber(owner.owner_phoneNumber)
   
    if(store){
        setStoreName(store[0].store_name)
        setStoreNumberOfTables(store[0].store_NoOfTables)
        setStoreOpenTime(store[0].store_openTime)
        setStoreCloseTime(store[0].store_closeTime)
    }
  },[owner,loading,store])


  // useEffect(() => {
  //   if(owner){
  //      dispatch(getStoreById(owner.owner_storeId[0].storeId))
  //   }

  // }, [owner])
  
  return (
    
      <div className='w-screen h-screen flex bg-black '>
        {/* side bar */}
        <Sidebar route={3}/>
        {/* side bar */}
      
       
            <div className="w-[80%] flex">
            <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
          <ScrollArea className='flex flex-col items-center justify-center w-full p-11'> 
          <header className='w-full flex justify-between'>
              <h2 className='text-white text-xl hover:text-amber-300 cursor-pointer '>Owner Details</h2>
              <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black'>Save</Button>
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
          <h3 className='text-white'>Aadharcard Number</h3>
          <CardDescription>
          <Input className='text-amber-400 placeholder:text-slate-500'   placeholder='23284343050338984' value={AadharCard} onChange={(e)=> setAadharCard(e.target.value)}/>
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
  
          <div className='w-[40%]'>
          <h3 className='text-white'>Logo</h3>
          <CardDescription>
          <Input className='text-amber-400 w-[35%] bg-gradient-to-b cursor-pointer from-yellow-300 placeholder:text-slate-500 to-orange-400 border border-yellow-600 center  ' placeholder="upload"   type='file'/>
          </CardDescription>
          </div>
          </Card>
  
      {/* subscription */}
          <Card className='bg-transparent w-[90%] flex justify-between gap-11 p-10 flex-wrap mb-11'>
  
  
          <div className='w-[40%]'>
          <h3 className='text-white text-2xl'>Change Subscription</h3>
         
          </div>
  
          <Button className='rounded-md text-white bg-none border' onClick={()=>navigate("/plans")}>Choose Another Plan</Button>
          </Card>
  
          </ScrollArea>
          </div>
      
      
    </div>
     )
    
  
}

export default Profile