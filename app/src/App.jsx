import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Header } from './components/Header';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Signin } from './pages/Signin';
import { firebaseConfig } from './config/Config';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { AuthContext } from './contexts/AuthContext'

function App() {
  const [auth, setAuth] = useState()

  const FirebaseApp = initializeApp(firebaseConfig)
  const FirebaseAuth = getAuth(FirebaseApp)

  onAuthStateChanged(FirebaseAuth, (user) => {
    if (user) {
      setAuth(user)
    }
    else {
      setAuth(null)
    }
  })

  return (
    <>
      <AuthContext.Provider value={auth} >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup authapp={FirebaseAuth} />} />
          <Route path="/logout" element={ <Logout authapp={FirebaseAuth} /> } />
          <Route path="/signin" element={<Signin authapp={FirebaseAuth} />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
