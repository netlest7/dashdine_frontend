
import logo from "../../assets/logo.png"
import menu from "../../assets/Dining.png"
import profile from "../../assets/User.png"
import dashboard from "../../assets/Control Panel.png"
import { Button } from '@/components/ui/button'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"



// eslint-disable-next-line react/prop-types
export const Sidebar = ({route}) => {


 const navigate = useNavigate()


  return (
    <div className="w-[20%] h-[100vh] flex flex-col gap-10  border-r  items-center bg-gradient-to-b from-gray-400/62 to-gray-900/62 ">
        <img src={logo} width={150} className='mt-10' onClick={()=> navigate("/")}/>

        <div className='flex flex-col gap-4 mt-6'>
       
       <div className='flex gap-4 cursor-pointer items-center'>
       <img src={menu} />
       <a className={`${route===1 ? "text-amber-300 " : "text-white"} hover:text-amber-300 hover:text-lg`} href='/menu'>Menu</a>
       </div>
         
         <div className='flex gap-4 cursor-pointer items-center'>
         <img src={dashboard}/>
        <a className={`${route===2 ? "text-amber-300 " : "text-white"} hover:text-amber-300 hover:text-lg`} href='/dashboard'>Dashboard</a>
         </div>
        
        <div className='flex gap-4 cursor-pointer items-center'>
        <img src={profile}/>
        <a className={`${route===3 ? "text-amber-300 " : "text-white"} hover:text-amber-300 hover:text-lg`} href='/profile'>Profile</a>
        </div>
            
        </div>

        <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black  mb-8'><FaPlus className='mr-2'/> Add Store </Button>
        
      
        </div>
  )
}