// Import necessary Bootstrap styles and scripts
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/js/bootstrap.min.js';

import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import{CartProvider} from './components/ContextReducer'

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
