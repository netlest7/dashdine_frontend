import PlanComponents from "../Home/component/PlanComponents"
import { PlanFeatures } from "../Home/Home"
import logo from "../../assets/logo.png"
import { useSelector } from "react-redux"
import axios from "axios"

const url = "http://localhost:4000/api/v1"
// const url = "https://dash-dine.onrender.com/api/v1"

const Plans = () => {
  const {owner} = useSelector(state => state.owner)

  const RegularCheckoutHandler = async(amount) =>{
    console.log("Hello");
    // api call
    const {data:{key}} = await axios.get('http://localhost:4000/api/v1/getkey')
    const {data:{regularKey}} = await axios.get('http://localhost:4000/api/v1/regularPlanId')
    const {data:{order}} = await axios.post(`${url}/createSubscription`,{
      plan_id:regularKey
    },{
      withCredentials: true
  })
  console.log(order,"lund ka order");

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dash Dine", //your business name
      description: "Regular Plan",
      image: logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/api/v1/paymentVerification",
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: owner.owner_name, //your customer's name
          email: owner.owner_email,
          contact: owner.owner_phoneNumber //Provide the customer's phone number for better conversion rates 
      },
      notes: {
          "address": "Dash Dine PVT LTD"
      },
      theme: {
          color: "#3399cc"
      }
  };
  var razor = window.Razorpay(options);
  razor.open();
  console.log(razor);
}

  const PlusCheckoutHandler = async(amount) =>{
    console.log("Hello");
    // api call
    const {data:{key}} = await axios.get('https://dash-dine.onrender.com/api/v1/getkey')
    const {data:{regularKey}} = await axios.get('https://dash-dine.onrender.com/api/v1/regularPlanId')
    const {data:{order}} = await axios.post(`${url}/createSubscription`,{
      plan_id:regularKey
    },{
      withCredentials: true
  })
  console.log(order,"lund ka order");

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dash Dine", //your business name
      description: "Regular Plan",
      image: logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://dash-dine.onrender.com/api/v1/paymentVerification",
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: owner.owner_name, //your customer's name
          email: owner.owner_email,
          contact: owner.owner_phoneNumber //Provide the customer's phone number for better conversion rates 
      },
      notes: {
          "address": "Dash Dine PVT LTD"
      },
      theme: {
          color: "#3399cc"
      }
  };
  var razor = window.Razorpay(options);
  razor.open();
  console.log(razor);
}
  const ProCheckoutHandler = async(amount) =>{
    console.log("Hello");
    // api call
    const {data:{key}} = await axios.get('https://dash-dine.onrender.com/api/v1/getkey')
    const {data:{regularKey}} = await axios.get('https://dash-dine.onrender.com/api/v1/regularPlanId')
    const {data:{order}} = await axios.post(`${url}/createSubscription`,{
      plan_id:regularKey
    },{
      withCredentials: true
  })
  console.log(order,"lund ka order");

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dash Dine", //your business name
      description: "Regular Plan",
      image: logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://dash-dine.onrender.com/api/v1/paymentVerification",
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: owner.owner_name, //your customer's name
          email: owner.owner_email,
          contact: owner.owner_phoneNumber //Provide the customer's phone number for better conversion rates 
      },
      notes: {
          "address": "Dash Dine PVT LTD"
      },
      theme: {
          color: "#3399cc"
      }
  };
  var razor = window.Razorpay(options);
  razor.open();
  console.log(razor);
}

const dummy = async(amount) => {
  console.log(amount);
}
  
  return (
    <div className='w-screen h-screen bg-black flex justify-center flex-col items-center gap-5'>
      <h1 className="text-white text-4xl">Our Plans</h1>
      <div className='w-full flex gap-11 justify-center'>
        <PlanComponents planType='REGULAR' planAmount='599' planFeatures={PlanFeatures.regular} checkoutHandler={dummy} />
        <PlanComponents planType='PLUS' planAmount='1100' planFeatures={PlanFeatures.plus} checkoutHandler={PlusCheckoutHandler}/>
        <PlanComponents planType='PREMIUM' planAmount='1499' planFeatures={PlanFeatures.premium} checkoutHandler={ProCheckoutHandler}/>
        </div>
    </div>
  )
}

export default Plans