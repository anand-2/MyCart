import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom'  
import Home from "./ui/Home"
import axios from 'axios';



function App() {
  axios.defaults.headers.common['Content-Type'] ='application/json;charset=UTF-8'  // for all requests
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;