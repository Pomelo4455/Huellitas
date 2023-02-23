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
  UserBaneadoRoute
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
import Fundaciones from "./components/Fundaciones/Fundaciones";
import UserDetail from "./components/UserDetail/UserDetail";
import UserBaneado from "./components/UserBanedo/UserBaneado";
import Favorites from "./components/Favorites/Favorites";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

export const auth = new Auth();

function App() {
  let user = JSON.parse(window.localStorage.getItem("loggedUser"));
  if (!user) user = {};

  const [loggedUser, setLoggedUser] = useState(user);

  const profile = useSelector((state) => state.profile);
  useEffect(() => {}, [profile]);
  useEffect(() => {window.scrollTo(0, 0);}, []);

  return (
    <>
      <NavBar loggedUser={loggedUser.data} setLoggedUser={setLoggedUser} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
          <Navigate to="/home" />}
        />
        <Route path="/SobreNosotros" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
          <SobreNosotros />} 
        />
        <Route path="/home" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <Home/>} 
        />
        <Route path="/detail/:id" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <CardDetail />} 
        />
        <Route path="/Adoptar" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <AllCards />} 
        />
        <Route path="/userDetail/:id" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <UserDetail />} 
        />
        <Route path="/PublicarAdopcion" element={
            loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
            <UserProtectedRoute>
              <AdoptionForm />
            </UserProtectedRoute>
          }
        />
        <Route path="/campañas" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <Campañas />} 
        />
        <Route path="/campañas/:id" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <Detail />} 
        />
        <Route path="/PublicarCampaña" element={
            loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
            <FoundationProtectedRoute>
              <CampaignForm />
            </FoundationProtectedRoute>
          }
        />
        <Route path="/payment/error" element={<Fail />} />
        <Route path="/payment/gracias" element={<Gratitude />} />
        <Route path="/DashBoardAdm" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
            <AdminProtectedRoute>
              <DashBoardAdm />
            </AdminProtectedRoute>
          }
        />
        <Route path="/unauthRedirect/:props" element={<UnauthRedirect />} />
        <Route path="/Profile" element={
            loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
            : <Profile setLoggedUser={setLoggedUser} />}
        />
        <Route path="/chats" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <Mensajeria />} 
        />
        <Route path="/chat/:emisorId/:receptorId" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> 
          : <Mensajeria />} 
        />
        <Route path="/fundaciones" element={
          loggedUser.data?.status === 'baneado' ? <UserBaneado /> :
          <Fundaciones />} 
        />
        <Route path="/seguimiento" element={
            <UserProtectedRoute>
              <Favorites />
            </UserProtectedRoute>
          } 
        />
        <Route path="/:any" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
