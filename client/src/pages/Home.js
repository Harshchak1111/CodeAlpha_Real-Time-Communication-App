import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()

  const joinRoom = () => {
    if (roomId.trim() !== '') {
      navigate(`/room/${roomId}`)
    }
  }

  const goToWhiteboard = () => {
    navigate('/whiteboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      {/* Logo + Header */}
      <div className="flex flex-col items-center mb-8">
        <img src="/assets/unicorn.png" alt="App Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-4xl font-extrabold text-center">Real-Time Communication App</h1>
        <p className="text-center text-gray-300 mt-2 max-w-2xl">
          Connect instantly through video calls, collaborate on a whiteboard, and share files with ease — all in real-time.
        </p>
      </div>

      {/* Room Entry + Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-2">Join a Room</h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            className="w-full p-3 rounded bg-white text-black"
          />
          <button
            onClick={joinRoom}
            className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded text-lg font-semibold"
          >
            Enter Video Room
          </button>
          <button
            onClick={goToWhiteboard}
            className="bg-green-600 hover:bg-green-700 w-full py-3 rounded text-lg font-semibold"
          >
            Open Whiteboard
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 w-full py-3 rounded text-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Illustration Images */}
        <div className="flex flex-col gap-6 items-center">
          <img
            src="/assets/animerealtime.png"
            alt="Real-time Collaboration"
            className="w-72 rounded-lg shadow-xl border border-purple-500 hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/assets/corporate-management-strategy-solution-branding-concept.jpg"
            alt="Corporate Strategy"
            className="w-72 rounded-lg shadow-xl border border-blue-500 hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/assets/Mobile-bro.svg"
            alt="Mobile App"
            className="w-72 rounded-lg shadow-xl border border-green-500 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-12">
        © {new Date().getFullYear()} RealTimeComm | Built with 💻 + ☕
      </footer>
    </div>
  )
}

export default Home
