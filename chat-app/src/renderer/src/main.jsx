import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import HandleAuthContext from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
  position="bottom-left"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    <BrowserRouter>
    <HandleAuthContext>
      <App />
    </HandleAuthContext>
    </BrowserRouter>
  </React.StrictMode>
)
