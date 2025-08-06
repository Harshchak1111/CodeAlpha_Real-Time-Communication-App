import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Peer from 'simple-peer'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Room = () => {
  const { roomId } = useParams()
  const myVideo = useRef()
  const [peers, setPeers] = useState([])
  const userStream = useRef()
  const peersRef = useRef([])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      myVideo.current.srcObject = stream
      userStream.current = stream

      socket.emit('join', { roomId, userId: socket.id })

      socket.on('user-connected', userId => {
        const peer = createPeer(userId, socket.id, stream)
        peersRef.current.push({ peerId: userId, peer })
        setPeers(peers => [...peers, peer])
      })

      socket.on('signal', ({ userId, signal }) => {
        const item = peersRef.current.find(p => p.peerId === userId)
        if (item) item.peer.signal(signal)
      })
    })
  }, [])

  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on('signal', signal => {
      socket.emit('signal', { roomId, signal, userId: userToSignal })
    })
    return peer
  }

  return (
    <div className="p-4 bg-black text-white">
      <h2 className="text-center text-2xl mb-4">Room: {roomId}</h2>
      <video ref={myVideo} autoPlay muted className="w-1/2 mb-2 rounded" />
      <div className="grid grid-cols-2 gap-4">
        {peers.map((peer, index) => (
          <Video key={index} peer={peer} />
        ))}
      </div>
    </div>
  )
}

const Video = ({ peer }) => {
  const ref = useRef()
  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream
    })
  }, [])
  return <video ref={ref} autoPlay className="w-1/2 rounded" />
}

export default Room
