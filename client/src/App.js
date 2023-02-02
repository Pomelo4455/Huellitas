import { Route, Routes } from "react-router-dom";
// import Login from './componentes/Login/Login';
// import Sidebar from './components/Sidebar/Sidebar';
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import SobreNosotros from "./components/About/SobreNosotros";
import Home from "./components/Home/Home";
import CardDetail from "./components/CardDetail/CardDetail";
import "./App.css";
import AllCards from "./components/AllCards/AllCards";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<CardDetail />} />
        <Route path="/Adoptar" element={<AllCards />} />
      </Routes>
    </>
  );
}

export default App;
