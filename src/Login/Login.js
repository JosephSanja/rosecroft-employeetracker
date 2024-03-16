import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';



const Login=() => {
  
    const [username,usernameupdate] =useState('');
    const [password,passwordupdate] =useState('');
    const usenavigate =useNavigate()
    
    useEffect(()=>{
      sessionStorage.clear();
          },[]);

    const ProceedLogin =(e) => {
      e.preventDefault();
      if(validate()){
        console.log("proceed");
        
        fetch("https://rosecroft-employee-tracker-data.onrender.com/user/"+username).then((res)=>{
          return res.json();
        }).then((resp)=>{
          console.log(resp);
          //console.log(resp[Object.keys(resp)]);
          
          if(Object.keys(resp).length === 0){
            toast.error('Please enter valid username');
            
          }else{
            if(resp.password === password){
              toast.success('Success');
              sessionStorage.setItem('username',username);
              sessionStorage.setItem('userrole',resp.role);
              usenavigate('/ShiftScheduler')
              
              
            }else{
              toast.error('Please enter valid credentials');
            }
          }
        }).catch((err)=>{
          toast.error('Login Failed due to :'+err.message);
        });
      }
    }

    const validate =() => {
      let result=true;
      if(username === '' || username === null){
        result=false;
        toast.warn('Please enter username');
      
      }
      if(password === '' || password === null){
        result=false;
        toast.warn('Please enter password');
        
      }
      
     
    
      return result;
    }

    return (
      <div className='Login'>       
          <form onSubmit={ProceedLogin} className='login-form-header'>
            <h2>Rosecroft Employee Tracker</h2>
            <div className='login-form-body'>
                <label className="Loginlabel"> Username</label>
                
                <input value={username} onChange={e=>usernameupdate(e.target.value)} className="Logininput" placeholder='enter username'></input>
            
                <label className="Loginlabel"> Password</label>
            
                <input value={password} onChange={e=>passwordupdate(e.target.value)} className="Logininput" type='password' placeholder='enter password'></input>
              
              
            </div>
            <div className='login-form-footer'>
                <button type="submit" className="login-button" > Login</button>
                <Link className="btn-success" to={'/register'}>New User</Link>
              </div>
              <ToastContainer />
          </form>
          
                  
      </div>
  
  );
  

  
}

export default Login;