import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Login from './componentes/Login/Login';
// import Sidebar from './components/Sidebar/Sidebar';
import AdoptionForm from "./components/AdoptionForm/AdoptionForm";
import Footer from "./components/Footer/Footer";
// import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import SobreNosotros from "./components/About/SobreNosotros";
import Home from "./components/Home/Home";
import CardDetail from "./components/CardDetail/CardDetail";
import "./App.css";
import AllCards from "./components/AllCards/AllCards";
import NotFound from "./components/NotFound/NotFound";
import Campañas from "./components/Campaigns/Campaigns";
import Detail from "./components/Campaigns/DetailCampaign";
import CampaignForm from "./components/CampaignForm/CampaignForm";
import Gratitude from "./components/Gratitude/Gratitude";
import Fail from "./components/Fail/Fail";
import {
  AdminProtectedRoute,
  FoundationProtectedRoute,
  UserProtectedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";
import UnauthRedirect from "./components/UnauthRedirect/UnauthRedirect";
import Profile from "./components/Profile/Profile";
import Auth from "./Utils/auth";
import AuthCheck from "./Utils/authcheck";
import history from "./Utils/history";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login_failure,
  login_success,
  remove_profile,
  add_profile,
} from "./redux/actions/index";
import DashBoardAdm from "./components/DashBoardAdm/DashBoardAdm";
import { User } from "@auth0/auth0-react";
import Mensajeria from "./components/Mensajeria/Mensajeria";

export const auth = new Auth();

function App() {
  let user = JSON.parse(window.localStorage.getItem("loggedUser"));
  if (!user) user = {};

  const [loggedUser, setLoggedUser] = useState(user);

  const profile = useSelector((state) => state.profile);
  useEffect(() => {}, [profile]);

  // console.log(loggedUser)
  // const handleAuthentication = (props) => {
  //   if (props.location.hash) {
  //     auth.handleAuth();
  //   }
  // };
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(auth.isAuthenticated()) {
  //     dispatch(login_success())
  //     auth.getProfile()
  //     console.log(auth.profile)
  //     // setTimeout(() => {dispatch(add_profile(auth.userProfile))}, 400)
  //   }
  //   else {
  //     console.log("not logged in")
  //     // dispatch(login_failure())
  //     // dispatch(remove_profile())
  //   }
  // },[])

  return (
    <>
      <NavBar
      loggedUser={loggedUser.data} setLoggedUser={setLoggedUser}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="/Footer" element={<Footer />} /> */}
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/Adoptar" element={<AllCards />} />
        <Route
          path="/PublicarAdopcion"
          element={
            <UserProtectedRoute>
              <AdoptionForm />
            </UserProtectedRoute>
          }
        />
        <Route path="/campañas" element={<Campañas />} />
        <Route path="/campañas/:id" element={<Detail />} />
        <Route
          path="/PublicarCampaña"
          element={
            <FoundationProtectedRoute>
              <CampaignForm />
            </FoundationProtectedRoute>
          }
        />
        <Route path="/payment/error" element={<Fail/>} />
        <Route path="payment/gracias" element={<Gratitude />} />
        <Route path="/DashBoardAdm" element={<AdminProtectedRoute><DashBoardAdm /></AdminProtectedRoute>}/>
        <Route path="/unauthRedirect/:props" element={<UnauthRedirect />} />
        <Route path="/Profile" element={<Profile setLoggedUser={setLoggedUser} />}/>
        <Route path="/chat/:emisorId/:receptorId" element={<Mensajeria/>}/>
        <Route path="/:any" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
