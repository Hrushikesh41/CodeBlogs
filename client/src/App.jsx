import { useState } from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Registration from "./pages/Registration/Register"
import Login from './pages/Login/Login'
import Verify from './pages/Verify/Verify'
import AddBlogs from './pages/AddBlogs/AddBlogs'
import BlogCard from './Components/BlogCard/BlogCard'
import BlogPage from './pages/BlogPage/BlogPage'
import Profile from './pages/Profile/Profile'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'
import "./index.css"


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/signup' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/verify' element={<Verify />} />
          <Route exact path='/write' element={<AddBlogs />} />
          <Route exact path='/blog/:slug' element={<BlogPage />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/update' element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
