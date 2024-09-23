import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Header } from './components/Header';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { firebaseConfig } from './config/Config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

function App() {
  
  const FirebaseApp = initializeApp( firebaseConfig )
  const FirebaseAuth = getAuth( FirebaseApp )

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/signup" element={ <Signup/> } />
      </Routes>

    </>
  )
}

export default App
