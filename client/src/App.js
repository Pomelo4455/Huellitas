import { Route, Routes } from 'react-router-dom';
// import Login from './componentes/Login/Login';
import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';
import "./App.css";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
// import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import SobreNosotros from "./components/About/SobreNosotros";
import Home from "./components/Home/Home";

function App() {
  return (



    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
