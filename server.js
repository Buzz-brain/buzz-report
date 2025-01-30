const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { uploadVideoStream } = require('./utils/upload'); // Import the Cloudinary upload logic
const Incident = require('./models/Incident'); // Your incident model

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


// Serve the static files (index.html and admin.html)
app.use(express.static(__dirname + '/public'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Middlewares
app.use(express.json()); // To parse incoming JSON requests
app.set('view engine', 'ejs');


// Home Route
app.get('/', (req, res) => {
  res.render('index');
});
// Home Route
app.get('/login', (req, res) => {
  res.render('login');
});
// Home Route
app.get('/register', (req, res) => {
  res.render('register');
});
// Home Route
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});


// Home Route
app.get('/admin', (req, res) => {
  res.render('admin');
});

const incidentRoutes = require('./routes/incidentRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes);


// Define a constant for the admin's socket ID
const ADMIN_IDENTIFIER = 'admin_user_id'; // Replace with your desired ID


// Map to track connected users and their socket IDs
const connectedUsers = new Map(); // Change to Map for key-value pairs


// Real-time communication for live streaming
io.on('connection', (socket) => {

  // console.log(`New connection: ${socket.id}`);

  const userId = socket.handshake.query.id; // Get the user identifier from query

  // Check if the connecting socket is the admin
  if (userId === ADMIN_IDENTIFIER) {
    console.log('Admin has connected');
    connectedUsers.set(ADMIN_IDENTIFIER, socket.id); // Store admin's socket ID
  } else {
    // If it's a user, add to the map with their identifier
    connectedUsers.set(userId, socket.id);
    console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
  }


  socket.on('iceCandidate', (data) => {
    // console.log('ICE candidate received:', data); // Log the full data object

    const { target } = data;

    if (connectedUsers.has(target)) {
      const targetSocketId = connectedUsers.get(target);

      // Emit the ICE candidate to the target user
      if (targetSocketId) {
        socket.to(targetSocketId).emit('iceCandidate', data);
      } else {
        console.error(`No socket ID found for target user: ${target}`);
      }
    } else {
      console.error(`Target ${target} not connected for ICE candidate.`);
    }
  });


  // Emit signal only if admin is connected
  socket.on('signal', (data) => {
    // console.log("Signal received: ", data.target, data.source);

    const target = data.target;

    // Check if the target (user) is connected
    if (connectedUsers.has(target)) {
      const targetSocketId = connectedUsers.get(target); // Get the socket ID for the target

      // Emit the signal to the target user
      socket.to(targetSocketId).emit('signal', {
        signal: data.signal,
        source: userId, // Send the correct source user ID
      });
    } else {
      console.error(`Signal failed: Target ${target} not found`);
    }
  });

  // console.log("Connected users: ", Array.from(connectedUsers));



  // Handle video stream initiation
  socket.on('startLiveStream', (data) => {
    console.log('Live stream started:', data);
    // Notify admins or other users about the live stream
    socket.broadcast.emit('liveStreamStarted', data);
  });



  // Handle video upload when the stream is stopped
  // socket.on('stopLiveStream', async (data) => {
  //   console.log('Stopping live stream and uploading video...');

  //   console.log('Video Stream Data:', data.videoStream);

  //   try {
  //        // Upload video stream directly to cloud (no temporary storage)
  //        const videoUrl = await uploadVideoStream(data.videoStream); // Send video stream data directly to your cloud service


  //       // Store video details in MongoDB
  //       const newIncident = new Incident({
  //           userId: data.userId,
  //           location: data.location,
  //           description: data.description,
  //           videoUrl: videoUrl, // Save the Cloudinary URL
  //           timestamp: new Date(),
  //       });
  //       await newIncident.save();
  //       console.log('Incident saved to database');
  //       console.log(videoUrl)

  //       socket.emit('videoUploaded', { videoUrl });
  //   } catch (error) {
  //       console.error('Error uploading video or saving incident:', error);
  //       socket.emit('uploadError', { message: 'Failed to upload video or save incident.' });
  //   }
  // })example_user_id

  const multer = require('multer');
  const upload = multer(); // Multer to handle file uploads

  // Endpoint to handle video upload from client
  app.post('/uploadVideoStream', upload.single('video'), async (req, res) => {
    try {
      // Video file from request
      const videoFile = req.file;

      console.log(videoFile)

      // Upload the video to Cloudinary (or any other cloud service)
      const videoUrl = await uploadVideoStream(videoFile.buffer);

      // Respond with the video URL
      res.json({ videoUrl });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Failed to upload video.' });
    }
  });






  // Handle disconnection
  socket.on('disconnect', () => {
    const userId = Array.from(connectedUsers.entries()).find(([, socketId]) => socketId === socket.id)?.[0];
    if (userId) {
      connectedUsers.delete(userId); // Remove user based on their ID
      console.log('A user disconnected:', socket.id);
    }
  });


});


// Start the server
const PORT = process.env.PORT || 4300;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


