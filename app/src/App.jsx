import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Header } from './components/Header';
import { Footer } from './components/Footer'
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Signin } from './pages/Signin';
import { BookDetail } from './pages/BookDetail';
import { AddBook } from './pages/admin/AddBook';
import { ListLoans } from './pages/admin/ListLoans';
// firebase stuff
import { firebaseConfig } from './config/Config';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { AuthContext } from './contexts/AuthContext'
import { getFirestore } from 'firebase/firestore'
import { FirestoreContext } from './contexts/FirestoreContext'
import './App.css'

function App() {
  const [auth, setAuth] = useState()
  const [admin, setAdmin] = useState(false)

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
          <Header mode={ admin } />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup authapp={FirebaseAuth} />} />
            <Route path="/logout" element={<Logout authapp={FirebaseAuth} />} />
            <Route path="/signin" element={<Signin authapp={FirebaseAuth} admin={ setAdmin } />} />
            <Route path="/detail/:bookId" element={<BookDetail /> } />
            <Route path="/admin/addbook" element={ <AddBook mode={admin} /> } />
            <Route path="/admin/listloans" element={ <ListLoans mode={admin} /> } />
          </Routes>
          <Footer />
        </FirestoreContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
