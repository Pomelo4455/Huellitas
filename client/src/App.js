import { Route, Routes } from 'react-router-dom';
// import Login from './componentes/Login/Login';
import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';
import "./App.css";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
// import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Home from "./components/Home/Home";
import CardDetail from './components/CardDetail/CardDetail';

function App() {
  return (



    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<CardDetail />} />
      </Routes>
    </>
  );
}

export default App;