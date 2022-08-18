import { useState } from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Registration from "./pages/Registration/Register"
import Login from './pages/Login/Login'
import "./index.css"


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/signup' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
