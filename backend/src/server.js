import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import indexRoutes from './routers/index.js';
import errorHandler from './middlewares/errorHandler.js';

// Setup for file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Create HTTP server for Express and WebSocket
const server = http.createServer(app);

// Initialize socket.io
const io = new socketIo(server);


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files (e.g., public assets)
app.use(express.static(path.join(__dirname, 'public')));

// Use your Express routes
app.use('/api', indexRoutes);

// Handle 404 errors for undefined routes
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler middleware
app.use(errorHandler);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');
  
  // You can use Redis Pub/Sub here to broadcast messages to clients
  socket.on('message', (data) => {
    console.log('Received message from client:', data);
    // Example: Publish message to a Redis channel
    redisClient.publish('simulationUpdates', JSON.stringify(data));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default io;  
