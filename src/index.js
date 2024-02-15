import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login/Login';
import reportWebVitals from './reportWebVitals';

import { ToastContainer } from 'react-toastify';

const jsonSever = require("json-server");//importing json-server library
const server = jsonSever.create();
const router = json.router("db.json");
const middlewares = jsonSever.defaults();
const port = process.env.PORT || 8000; // chose port from here like 8000,3001

server.use(middlewares);
server.use(router);

server.listen(port);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
    
   
    <ToastContainer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
