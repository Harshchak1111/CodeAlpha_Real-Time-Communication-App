import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { username, password })
    localStorage.setItem('token', res.data.token)
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Login</h1>
      <input className="mb-2 p-2 rounded text-black" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="mb-2 p-2 rounded text-black" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
