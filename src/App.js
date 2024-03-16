
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShiftScheduler from './Home/ShiftScheduler';
import Login from './Login/Login';
import Register from './Register/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';


function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<ShiftScheduler/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;