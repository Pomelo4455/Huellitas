import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import SobreNosotros from "./components/About/SobreNosotros";
import Home from "./components/Home/Home";
import CardDetail from './components/CardDetail/CardDetail';
import "./App.css";

function App() {
  return (



    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<CardDetail />} />
      </Routes>
    </>
  );
}

export default App;
