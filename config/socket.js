const socketIo = require("socket.io");

let io;

function initialize(server) {
  io = socketIo(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://swiggy-clone-kappa.vercel.app'],
      methods: ['GET', 'POST']
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

module.exports = { initialize, getIo };
