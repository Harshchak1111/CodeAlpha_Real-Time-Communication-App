import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Room from './pages/Room'
import Whiteboard from './pages/Whiteboard'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/whiteboard" element={<Whiteboard />} />
    </Routes>
  </Router>
)

export default App
