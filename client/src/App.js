import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Footer" element={<Footer />} />
    </Routes>
  );
}

export default App;
