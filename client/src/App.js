import { Route, Routes } from 'react-router-dom';
import NavBar from './componentes/NavBar/NavBar';
import './App.css';

function App() {
  return (

<Routes>
  <Route path="/" element={<NavBar/>} />
</Routes>

  );
}

export default App;