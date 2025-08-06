const express = require('express')
const http = require('http')
const cors = require('cors')
const helmet = require('helmet')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const authRoutes = require('./routes/authRoutes')

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
  server.listen(process.env.PORT || 5000)
}).catch(err => console.error('MongoDB connection error:', err))

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(fileUpload())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/api/auth', authRoutes)

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).json({ message: 'No file uploaded' })
  const file = req.files.file
  const filePath = __dirname + `/uploads/${file.name}`
  file.mv(filePath, err => {
    if (err) return res.status(500).json({ message: 'File upload failed' })
    res.json({ message: 'File uploaded', path: `/uploads/${file.name}` })
  })
})

const users = {}

io.on('connection', socket => {
  socket.on('join', ({ roomId, userId }) => {
    socket.join(roomId)
    users[socket.id] = userId
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
      delete users[socket.id]
    })
  })

  socket.on('signal', ({ roomId, signal, userId }) => {
    socket.to(roomId).emit('signal', { signal, userId })
  })
})
