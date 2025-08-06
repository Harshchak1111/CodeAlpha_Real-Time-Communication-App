import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { username, password })
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Register</h1>
      <input className="mb-2 p-2 rounded text-black" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="mb-2 p-2 rounded text-black" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 px-4 py-2 rounded" onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
