import { Route, Routes } from "react-router-dom";
// import Login from './componentes/Login/Login';
// import Sidebar from './components/Sidebar/Sidebar';
import AdoptionForm from "./components/AdoptionForm/AdoptionForm";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import SobreNosotros from "./components/About/SobreNosotros";
import Home from "./components/Home/Home";
import CardDetail from "./components/CardDetail/CardDetail";
import "./App.css";
import AllCards from "./components/AllCards/AllCards";
import NotFound from "./components/NotFound/NotFound";
import Campañas from "./components/Campaigns/Campaigns";
import Detail from "./components/Campaigns/DetailCampaign";
import CampaignForm from "./components/CampaignForm/CampaignForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/SobreNosotros" element={<SobreNosotros/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<CardDetail/>} />
        <Route path="/Adoptar" element={<AllCards/>} />
        <Route path="/PublicarAdopcion" element={<AdoptionForm/>} />
        <Route path="/campañas" element={<Campañas/>} />
        <Route path="/campañas/:id" element={<Detail/>} />
        <Route path="/PublicarCampaña" element={<CampaignForm/>} />
        <Route path="/:any" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
