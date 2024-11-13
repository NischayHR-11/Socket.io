Here are the basic Socket.io commands with brief descriptions:

1. io.on(event, callback)

Usage: Sets up a connection event listener. Commonly used to detect when a client connects to the server.

Example:

io.on('connection', (socket) => {
  console.log('A user connected');
});

Explanation: When a new client connects, the callback is triggered.


2. socket.on(event, callback)

Usage: Listens for an event emitted by the client (or server).

Example:

socket.on('message', (data) => {
  console.log('Message received: ', data);
});

Explanation: Executes the callback whenever the specified event occurs.


3. socket.emit(event, data)

Usage: Emits an event with data to the connected client (or server).

Example:

socket.emit('message', 'Hello from server');

Explanation: Sends a message or data to the client.


4. io.emit(event, data)

Usage: Emits an event to all connected clients.

Example:

io.emit('broadcast', 'This message is sent to all clients');

Explanation: Sends a message to all clients connected to the server.


5. socket.broadcast.emit(event, data)

Usage: Emits an event to all connected clients except the sender.

Example:

socket.broadcast.emit('message', 'A user has joined');

Explanation: Useful for sending notifications to other users, excluding the one who triggered the event.


6. socket.join(room)

Usage: Adds the client to a specific room.

Example:

socket.join('room1');

Explanation: The client is added to the specified room, allowing room-specific messaging.


7. socket.leave(room)

Usage: Removes the client from a specific room.

Example:

socket.leave('room1');

Explanation: The client leaves the specified room.


8. io.to(room).emit(event, data)

Usage: Sends a message to all clients in a specific room.

Example:

io.to('room1').emit('message', 'Hello room1!');

Explanation: Sends an event only to clients in the given room.


9. socket.disconnect()

Usage: Disconnects the socket from the server.

Example:

socket.disconnect();

Explanation: Closes the connection between the server and the client.


10. socket.on('disconnect', callback)

Usage: Listens for the disconnect event when a client disconnects from the server.

Example:

socket.on('disconnect', () => {
  console.log('User disconnected');
});

Explanation: This callback is executed when the client disconnects.


11. io.of(namespace)

Usage: Creates or retrieves a namespace.

Example:

const chat = io.of('/chat');
chat.on('connection', (socket) => {
  console.log('Chat namespace user connected');
});

Explanation: Namespaces allow you to separate logic and events for different parts of your application.


12. socket.to(room).emit(event, data)

Usage: Sends an event to all clients in a room, except the sender.

Example:

socket.to('room1').emit('message', 'A user sent a message');

Explanation: Sends an event to others in the room but excludes the sender.


13. socket.id

Usage: A unique identifier for each connected socket.

Example:

console.log('Socket ID:', socket.id);

Explanation: Every connected client has a unique socket ID.


14. io.sockets

Usage: Refers to all connected sockets.

Example:

io.sockets.emit('message', 'Hello everyone');

Explanation: Used to interact with all clients at once.


15. socket.rooms

Usage: Lists all the rooms a client is currently in.

Example:

console.log(socket.rooms);

Explanation: Provides a list of rooms the socket is part of.


16. io.close()

Usage: Shuts down the server and disconnects all clients.

Example:

io.close();

Explanation: Gracefully shuts down the Socket.io server.


These commands cover most of the basic functionality of Socket.io used in real-time communication projects.


