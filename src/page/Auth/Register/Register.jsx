import { useNavigate } from 'react-router-dom'
import loginBgImg from '../../../assets/loginBG.png'
import logo from "../../../assets/logo.png"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { RxCross2 } from "react-icons/rx";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { ownerAccountVerificationWithOtp, registerOwner } from '@/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { clearUserMessagesOTP } from '@/redux/reducer/userReducer/userOtpVerification';


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {message,activationToken} = useSelector(state => state.ownerRegister);
  const {otpRegMessage} = useSelector(state => state.otpVerification);
  const [owner_email,setOwner_email] = useState("");
  const [owner_name,setOwner_name] = useState("");
  const [owner_password,setOwner_password] = useState("");
  const [otp,setOtp] = useState("");
    const navigation = useNavigate()
    const [showPassword,setShowPassword] = useState(false);
    const [openOtp,setOpenOtp] = useState(false);


    const onClickGenerateHandler = async() => {

      if(owner_email && owner_name && owner_password){
        dispatch(registerOwner(owner_email,owner_name,owner_password))
        setOpenOtp(true)
      }
    }

    // otp handler
   const otpSubmitHandler = () => {
    console.log(otp, "opt ra luchs");
    console.log(activationToken);
    if(activationToken){
      dispatch(
        ownerAccountVerificationWithOtp(otp,activationToken)
      )
      setOpenOtp(false)
    }
   }

   useEffect(() => {
     if(message){
      toast.success(message)
     }
   }, [message])

   useEffect(() => {
     if(otpRegMessage){
      toast.success(otpRegMessage)
      setOwner_email("")
      setOwner_name("")
      setOwner_password("")
      dispatch(clearUserMessagesOTP())
      setTimeout(() => {
       navigate("/login")  
      }, 1000);
     }
    

   }, [otpRegMessage])



   
  return (
    <main className='relative w-screen h-screen flex gap-0 bg-black'>
      <Toaster/>
        {
          openOtp ? <div className='w-screen absolute z-50 h-screen flex justify-center items-center  backdrop-blur-sm'>
            <Toaster/>
           <div className='w-[25%] border rounded-xl  p-10 relative flex flex-col gap-6 bg-black items-center'>
            <h3 className='text-white'>ENTER OTP</h3>
            <button className='text-white absolute top-0 right-0 m-3' onClick={() =>setOpenOtp(prev=> !prev)}><RxCross2 size={25}/></button>
           <InputOTP maxLength={4}
           value = {otp}
           onChange = {(value) => setOtp(value)}
           >
              <InputOTPGroup className="text-amber-300">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>

            <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black' onClick={otpSubmitHandler}>Submit</Button>

           </div>

          </div> : <></>
        }
        <section className='relative w-[50%] m-0 p-0'>
            <img src={loginBgImg} className='absolute w-full h-full object-fill '/>
            <img onClick={() => navigation('/')} src={logo} width={150} height={50} className='absolute top-5 left-5 cursor-pointer'/>
        </section>

        {/* User Input section  */}

        <section className='flex w-[50%] bg-black m-0 flex-col items-center '>
        <h2 className='text-white text-3xl text-center mt-10'>Signup</h2>

        <Card className='w-[400px] h-[550px] bg-transparent flex flex-col items-center justify-center  bg-gradient-to-b from-[#1E1E1E] to-black-100 mb-9 mt-[20px] '>
        <CardContent className='flex flex-col gap-6 w-full'>

        <div className='text-white w-full flex flex-col gap-3'>
        <label htmlFor="name">Full Name</label>
        <Input placeholder='Yash Sharma...' value={owner_email} onChange={(e) => setOwner_email(e.target.value)} />
       </div>

        <div className='text-white w-full flex flex-col gap-3'>
        <label htmlFor="email">Email Id</label>
        <Input placeholder='example@gmail.com' value={owner_name} onChange={(e)=>setOwner_name(e.target.value)} />
       </div>

       <div className='w-full text-white flex flex-col gap-3'>
       <label htmlFor="password">Password</label>
        <Input placeholder='password@#$..' type={showPassword ? "text": "password"} value={owner_password} onChange={(e)=>setOwner_password(e.target.value)}/>

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

        <Button className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black' onClick={onClickGenerateHandler}>Get Started</Button>

        <div className='flex text-white items-center gap-4'>
        <hr className='w-[45%]'/> 
        <p>Or</p>
        <hr className='w-[45%]'/> 
        </div>

        <p className='text-white text-center'>Already have an account? <a href='/login' className='text-[#FFBF46]'>Login</a></p>
        </CardContent>
        </Card>

        </section>
    </main>
  )
}

export default Register