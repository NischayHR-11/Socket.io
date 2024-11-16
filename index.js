const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path=require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine","ejs");                                    // When The Response Is 'Rendered' default path to access.
app.set("views",path.join(__dirname,"/views"));

// Define roles for different users
const ROLES = {
  PARENT: 'parent',
  ADMIN: 'admin',
  DRIVER: 'driver',
};


app.get('/driver', (req, res) => {
  res.render("./driver.ejs");
});

app.get('/admin', (req, res) => {
 res.render("./admin.ejs");
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for a user joining a room (based on role)
  socket.on('joinRoom', (role) => {
    socket.join(role);
    console.log(`${role} joined the room`);

    // Acknowledge room joining
    socket.emit('message', `You have joined as ${role}`);
  });

  // Listen for bus status updates from the driver
  socket.on('busStatus', (status) => {
    if (status === 'departed') {
      io.to(ROLES.PARENT).emit('notification', 'The bus has departed');
      io.to(ROLES.ADMIN).emit('notification', 'The bus has departed');
    } else if (status === 'reached') {
      io.to(ROLES.PARENT).emit('notification', 'The bus has reached the school');
      io.to(ROLES.ADMIN).emit('notification', 'The bus has reached the school');
    }
  });

  // Listen for driver video stream
  socket.on('driverStream', (data) => {
    // Broadcast the video stream to all admins
    socket.broadcast.emit('adminStream', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, "0.0.0.0", () => {
  console.log('Server is running on port 3000');
});
