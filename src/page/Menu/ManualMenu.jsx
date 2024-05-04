import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import  { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Sidebar } from '../HelpCompoents/Sidebar';
import { ScrollArea } from "@/components/ui/scroll-area"
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import {  updateMenu } from '@/redux/actions/storeActions';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateMenuRequest } from '@/redux/reducer/updateStoreReducer';



const ManualMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {menu,loading,message} = useSelector(state=> state.updateStore);
    const {owner} = useSelector(state => state.owner)
    const [category,setCategory] = useState("");


    const [item,setItem] = useState([
        {
            item_name: "",
            item_price: "",
            item_description: "",
            item_photo: {
                public_id: "",
                url:""
            }
        }
    ]);
    const addItem = () => {
        setItem(prevItems => [
          ...prevItems,
          {
            item_name: "New Item",
            item_price: "New Price",
            item_description: "New Description",
            item_photo: {
                public_id:"",
                url:""
            }
          }
        ]);
      };

      const handleItemChange = (index, field, value) => {
        const updatedItems = [...item];
        updatedItems[index][field] = value;
        console.log(item,"kldfslkdsflks");
        
    };

    const saveHandler =async() => {
         dispatch(updateMenu(owner.owner_storeId[0].storeId,category,item))
        // dispatch(getStoreById(owner.owner_storeId[0].storeId))
        
    }

    useEffect(() => {
      
        if(!loading && message) {

            toast.success("Menu Updated")
            setCategory("")
            console.log(menu,"fest");
            dispatch(updateMenuRequest())
            console.log(item ,"lund in menu");
            setItem([])


        }

    }, [menu])
    
    
  return (
    <div className='w-screen h-screen bg-black flex overflow-y-hidden '>

    <Sidebar route={1}/>
    <div className='w-full p-8 gap-3'>
        <Toaster/>
    <header className='flex w-full justify-between '>
       <h1 className='text-white text-2xl'>Add Food Items Manualy</h1>
       <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 
rounded-md text-black ' onClick={()=>saveHandler()}>Save </Button>
       </header>

        <div className='mb-9 border-b mt-9 p-2 w-[50%] px-0'>
        <h3 className='text-white text-xl mb-2'>Category</h3>
        <Input className='border-none text-amber-300 placeholder:text-red-50' value={category} onChange={(e)=> setCategory(e.target.value)}  required placeholder='Enter Category Ex - Burger'/>
        </div>


        <Button className=' bg-transparent border mb-9' onClick={addItem}>
            Add Item <GoPlus />
        </Button>

        <ScrollArea className='w-full h-full flex'>

       {

        item.map((_,index)=> (
            <Card key={index} className='bg-transparent p-4 flex w-[80%] text-white mb-5 gap-3'>
            <div className='w-[70%]'>
            <CardTitle className='mb-4'>
                Item Name
            </CardTitle>

            <CardDescription>
                <Input  placeholder='Enter the name of your items' className='text-amber-300' onChange={(e)=> handleItemChange(index, 'item_name', e.target.value)}/>
            </CardDescription>

            <CardTitle className='mb-4 mt-3'>
                Item Price
            </CardTitle>

            <CardDescription>
                <Input placeholder='Enter the price of your items'  className='text-amber-300' onChange={(e)=> handleItemChange(index, 'item_price', e.target.value)}/>
            </CardDescription>

            <CardTitle className='mb-4 mt-3'>
                Item Description
            </CardTitle>

            <CardDescription>
            <Textarea  className='text-amber-300' onChange={(e)=> handleItemChange(index, 'item_description', e.target.value)} />

            </CardDescription>
            </div>

            <div draggable = "true" className='text-white  border border-dashed rounded-3xl w-[30%] flex items-center justify-center'>
               <p>Drop your images here</p>
            </div>
        </Card>
        ))

       }
       <div className='h-[30vh]'>

       </div>
        </ScrollArea>
    </div>



    </div>
  )
}

export default ManualMenu