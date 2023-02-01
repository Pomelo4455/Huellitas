import { Route, Routes } from 'react-router-dom';
// import Login from './componentes/Login/Login';
import './App.css';
import Sidebar from './componentes/Sidebar/Sidebar';

function App() {
  return (

<Routes>
<Route path="/" element={<Sidebar/>} />
</Routes>

  );
}

export default App;
