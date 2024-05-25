import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");
    const navigate = useNavigate()
  return (
    <div className='bg-black flex justify-center items-center text-white w-screen h-screen flex-col gap-6'>
        <h1>Payment Successful<br/></h1>
        <p>Reference No: {referenceNum}</p>
        <Button onClick={()=>{navigate("/menu")
        toast.success("Subscription Added")
    }} className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black mb-9'>Proceed</Button>

    </div>
  )
}

export default PaymentSuccess