import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPuP3g5q_BJt9tSAYMzoOfM6L2m3w0Zzw",
  authDomain: "spotify-stats-31c3b.firebaseapp.com",
  projectId: "spotify-stats-31c3b",
  storageBucket: "spotify-stats-31c3b.appspot.com",
  messagingSenderId: "634296119737",
  appId: "1:634296119737:web:abff54b38fa0716b6bc668"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
