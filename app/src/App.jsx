import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Header } from './components/Header';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Signin } from './pages/Signin';
import { BookDetail } from './pages/BookDetail';
import { firebaseConfig } from './config/Config';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { AuthContext } from './contexts/AuthContext'
import { getFirestore } from 'firebase/firestore'
import { FirestoreContext } from './contexts/FirestoreContext'

function App() {
  const [auth, setAuth] = useState()

  const FirebaseApp = initializeApp(firebaseConfig)
  const FirebaseAuth = getAuth(FirebaseApp)
  const Firestore = getFirestore(FirebaseApp)

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
        <FirestoreContext.Provider value={Firestore}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup authapp={FirebaseAuth} />} />
            <Route path="/logout" element={<Logout authapp={FirebaseAuth} />} />
            <Route path="/signin" element={<Signin authapp={FirebaseAuth} />} />
            <Route path="/detail/:id" element={ <BookDetail/> } />
          </Routes>
        </FirestoreContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
