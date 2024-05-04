import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
  


// eslint-disable-next-line react/prop-types
const PlanComponents = ({planType,planAmount,planFeatures,checkoutHandler}) => {
  return (
<Card className={`bg-transparent w-[300px]  flex flex-col items-center justify-center  bg-gradient-to-b ${planType === 'PLUS' ? "from-green-900":"from-[#1E1E1E]"} to-black-800 mb-9 text-white hover:-translate-y-4 transition-transform duration-9000`}>
  <CardHeader>
    <div className='flex flex-col text-center gap-1'>
    <CardTitle className='text-xl'>{planType}</CardTitle>
    <CardDescription className='text-2xl w-full text-center text-white '>₹ {planAmount} / month</CardDescription>
    </div>
  </CardHeader>
  <CardContent>
  <RadioGroup>
  {
   // eslint-disable-next-line react/prop-types
   planFeatures.map((feature,index)=>(

      <div className="flex items-center space-x-2 mb-8" key={index}>
    <RadioGroupItem value="option-one" id="option-one" checked={feature.available} className='text-white border-white ' />
    <Label htmlFor="option-one" className={feature.available ?"text-white": "text-[#6B7280]" }>{feature.text}</Label>
    </div>  
 
    ))
  }
 
  
</RadioGroup>

  </CardContent>
  <Button onClick={()=> checkoutHandler(planAmount)} className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black mb-9'>Choose Plan</Button>
  {/* <button onClick={(planAmount)=> checkoutHandler(planAmount)} className='bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black mb-9'>Choose Plan</button> */}
</Card>

  )
}


export default PlanComponents;
