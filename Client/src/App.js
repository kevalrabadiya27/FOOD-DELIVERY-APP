import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './pages/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>

  );
}

export default App;
