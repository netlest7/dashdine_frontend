import { useNavigate } from 'react-router-dom'
import loginBgImg from '../../../assets/loginBG.png'
import logo from "../../../assets/logo.png"
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { loginOwner } from '@/redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'




const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false);
    const {owner,isAuthenticated} = useSelector((state) => state.owner)
    const loginHandler = async() => {
      console.log(email,password);
      dispatch(loginOwner(email, password));
    }

    useEffect(() => {
      if(isAuthenticated){
        toast.success("Logged In Successfully");
        navigation("/menu")
      }

    }, [owner])
    
    
    
  return (
    <main className='relative w-screen h-screen flex gap-0 bg-black'>
        <section className='relative w-[50%] m-0 p-0'>
            <img src={loginBgImg} className='absolute w-full h-full object-fill '/>
            <img onClick={() => navigation('/')} src={logo} width={150} height={50} className='absolute top-5 left-5 cursor-pointer'/>

        </section>

        {/* User Input section  */}
        <section className='flex w-[50%] bg-black m-0 flex-col items-center '>
      <Toaster/>

        <h2 className='text-white text-3xl text-center mt-10'>Login</h2>

        <Card className='w-[400px] h-[500px] bg-transparent flex flex-col items-center justify-center  bg-gradient-to-b from-[#1E1E1E] to-black-100 mb-9 mt-[20px] '>
        <CardContent className='flex flex-col gap-6 w-full'>
        <div className='text-white w-full flex flex-col gap-3'>
        <label htmlFor="email">Email Id</label>
        <Input placeholder='example@gmail.com' value={email} onChange={(e)=> setEmail(e.target.value)}/>
       </div>

       <div className='w-full text-white flex flex-col gap-3'>
       <label htmlFor="password">Password</label>
        <Input placeholder='password@#$..'  value={password} onChange={(e)=> setPassword(e.target.value)} type={showPassword ? "text": "password"}/>

        <div className='flex gap-2'>
        <Checkbox className='border-white text-white'  onCheckedChange={() => setShowPassword((prev)=> !prev)}/>
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Password
        </label>
        </div>
       </div>

        <Button className={`bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black`}  onClick={()=>loginHandler()}>Get Started</Button>

        <div className='flex text-white items-center gap-4'>
        <hr className='w-[45%]'/> 
        <p>Or</p>
        <hr className='w-[45%]'/> 
        </div>

        <p className='text-white text-center'>New Here? <a href='/register' className='text-[#FFBF46]'>Register</a></p>
        </CardContent>

       
        </Card>

        </section>
    </main>
  )
}

export default Login