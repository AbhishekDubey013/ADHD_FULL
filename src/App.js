import './App.css';
import Main from './components/Main';
import {Routes, Route, Form} from 'react-router-dom'
// import Cart from './components/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './components/Products';
import Ree from './Pages/Ree'
import Form1 from './Pages/Formi'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Footer  from './components/Footer'
import Chat from './components/Chat'
import Comp from './Pages/Comp'
import Reg from './Pages/Regpage'
import Ft from './Pages/Formf'
import End from './Pages/End'


//import Re from './components/Re'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/From1' element={<Form1 />} />
        <Route path='/ree' element={<Ree />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/comp' element={<Comp />} />
        <Route path='/reg' element={<Reg />} />
        <Route path='/ft' element={<Ft />} />
        <Route path='/end' element={<End />} />
      </Routes>
    </div>
  );
}

export default App;

//Define route in routes, always make component starting from capital letter