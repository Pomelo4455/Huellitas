import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Footer" element={<Footer />} />
    </Routes>
  );
}

export default App;
