import {BrowserRouter as Router , Route, Routes, useNavigate} from "react-router-dom"
import Home from "./page/Home/Home"
import Login from "./page/Auth/Login/Login"
import Register from "./page/Auth/Register/Register"
import Profile from "./page/Profile/Profile"
import Menu from "./page/Menu/HomeMenu"
import ManualMenu from "./page/Menu/ManualMenu"
import AutomaticMenu from "./page/Menu/AutomaticMenu"
import OwnerDetails from "./page/OwnerRegistration/OwnerRegistration"
import { loadOwner, refreshAccessToken } from "./redux/actions/userActions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStoreById } from "./redux/actions/storeActions"
import Plans from "./page/Plans/Plans"
import PaymentSuccess from "./page/HelpCompoents/PaymentSuccess"
import Dashboard from "./page/Dashboard/Dashboard"
import Qrpdf from "./page/QrPdf/Qrpdf"


function App() {

  const {owner,loading} = useSelector(state => state.owner)
  const {store} = useSelector(state => state.store)
  console.log(store);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Main App page -> refresh token api ");
    dispatch(refreshAccessToken())
    console.log("Main App page -> load owner ");
    dispatch(loadOwner())
  }, [])
  

  useEffect(() => {
    if(owner){
      console.log("Yesss");
      if(owner.owner_storeId[0]){
        console.log("Yessss");
        dispatch(getStoreById(owner.owner_storeId[0].storeId))
      }
    }
  }, [owner])
  
  

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/ownerRegisteration' element={<OwnerDetails owner={owner}/>}/>
        <Route path="/profile" element={<Profile owner={owner} loading={loading}/>}/>
        <Route path="/plans" element={<Plans/>}/>
        <Route path="/dashboard" element={<Dashboard owner={owner}/>}/>
        <Route path="/qr" element={<Qrpdf/>}/>

        {/* onwer payment successfull */}
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>

        {/* Menu */}
        <Route path="/menu" element={<Menu/>}/>
        <Route path='/menu/manual' element={<ManualMenu/>}/>
        <Route path='/menu/automatic' element={<AutomaticMenu/>}/>
      </Routes>
    </Router>
  )
}

export default App
