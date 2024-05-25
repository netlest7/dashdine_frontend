
import { Sidebar } from "../HelpCompoents/Sidebar"
import {
    Card,
    CardContent,
    CardHeader
  } from "@/components/ui/card"
  import QRCode from "qrcode"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaKitchenSet } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllStoreOrders } from "@/redux/actions/storeOrderActions"
import { Audio } from 'react-loader-spinner'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { MdQrCodeScanner } from "react-icons/md";
import { useNavigate } from "react-router-dom"
const url = "http://localhost:5174"

const Dashboard = ({owner}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,store} = useSelector(state=> state.store);
    const {orders} = useSelector(state=> state.storeOrders);
    // eslint-disable-next-line no-unused-vars
    const [storeId,setStoreId] = useState("")
    const [QrcodeUrl,setQrcodeUrl] = useState("")

    const tranfor = orders.map(order => {
        const tableNumber = order.table_number;
        
        const total_items = order.order_items.length;
        const order_type = order.order_type;
        const orderdItems = order.order_items.map(item=> item.item_name)
        const order_id = order._id
        return{
            order_id,
            tableNumber,
            orderedItem: orderdItems,
            totalItem: total_items,
            orderType: order_type,
        }
    })
    const renderTooltips = () => {
      const tooltips = [];
      for (let i = 0; i < store[0].store_NoOfTables; i++) {
        const isOrdered = tranfor.some((item) => item.tableNumber === i + 1);
        console.log(isOrdered,"louda");
        tooltips.push(
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger>
              <input key={i} disabled className={`w-[30px] h-[30px] ${!isOrdered ? "border-2 border-amber-300 bg-white" : "bg-green-400"} rounded-lg m-1 text-center placeholder-black`} placeholder={String(i+1)} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Table No: {i+1}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    
      return <div className="tooltips-container p-8">{tooltips}</div>;
  };
    useEffect(() => {
        
      
        if(store && !loading){
            setStoreId(store[0]._id)

            QRCode.toDataURL(`${url}/orders?storeId=${store[0]._id}`,(err,qrCodeUrl)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(store[0]._id,"lawda");
                    console.log(qrCodeUrl,"QE Ra lucha"); 
                    setQrcodeUrl(qrCodeUrl)
                }
            })
        }
    }, [store])

    useEffect(() => {
        if(store){
            dispatch(getAllStoreOrders(store[0]._id))
        }
    }, [store])
    

    // eslint-disable-next-line react/prop-types
    console.log(owner?.subscription?.id,"lund");
  return (
    // eslint-disable-next-line react/prop-types
    owner?.subscription?.id === undefined ? <div className="flex flex-col bg-black w-screen h-screen flex items-center justify-center">
      <h3 className="text-white text-lg">Please Buy The Subscription To Access Dashboard</h3>
      <Button className='bg-gradient-to-b from-yellow-300 mt-9 to-orange-400 border border-yellow-600 rounded-md text-black' onClick={()=>navigate('/plans')}>Plans</Button>

    </div> :
    loading ? (<div className="flex bg-black w-screen h-screen flex items-center justify-center">
      <Audio
  height="80"
  width="80"
  radius="9"
  color="yellow"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div>) : (
        <div className="w-screen h-screen flex bg-black gap-3">
    <Sidebar route={2}/>
    <div className="w-full flex flex-col p-4">
        <ScrollArea>
        <Card className="w-full bg-transparent flex justify-around items-center p-9">
        <div className="flex gap-5 items-center">
        <CardContent>
            <p className="text-white text-xl flex gap-4 cursor-pointer hover:text-amber-300">Access Kitchen <FaKitchenSet size={30}/></p>
        </CardContent>

        <CardContent className="  p-0">  
          <a className="p-0 m-0" href={`${url}/orders?storeId=${store[0]._id}`} target="_blank">
          <img className="cursor-wait" src={QrcodeUrl} width={200} height={200}/>
          </a>
        </CardContent>

        </div>

        <div className="flex flex-col gap-5 items-center">
        <MdQrCodeScanner size={100} className="text-white"/>
        <Button  className='bg-gradient-to-b cursor-pointer from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black mb-9' onClick={()=> navigate("/qr")}>Download QR</Button>
        </div>
        
        </Card>


        <div className="flex mt-4  gap-4">

        <Card className="w-[70%] bg-transparent flex justify-around items-center flex-col p-9">
            <Card className="w-[90%] h-[70px] bg-transparent border-white flex items-center justify-between p-4">
                <CardHeader className="text-white text-xl">Pending Orders</CardHeader>
                <p className="text-amber-300 text-2xl">{tranfor.length}</p>
            </Card>
            <Card className="w-[90%] h-[70px] bg-transparent border-white flex items-center justify-between p-4">
                <CardHeader className="text-white text-xl">Orders Served</CardHeader>
                <p className="text-amber-300 text-2xl">5</p>
            </Card>
            <Card className="w-[90%] h-[70px] bg-transparent border-white flex items-center justify-between p-4">
                <CardHeader className="text-white text-xl">Revenu Gernerated</CardHeader>
                <div className="flex gap-3">
                <p className="text-white text-2xl"> RS</p>
                <p className="text-amber-300 text-2xl"> 632</p>
                </div>
            </Card>
        </Card>
        
        <Card className="bg-transparent w-[30%] h-full">
        <CardHeader className="text-white text-3xl text-center">Live Order Status</CardHeader>
        <CardHeader className="text-white text-xl text-center">{store[0].store_name}</CardHeader>
        {
            renderTooltips()
        }
        </Card>

       
        </div>



        </ScrollArea>
    </div>


    </div>
    )
  )
}

export default Dashboard