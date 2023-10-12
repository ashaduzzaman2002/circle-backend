const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000 || process.env.PORT;
const cloudinary = require('cloudinary');
const Razorpay = require('razorpay');
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);


// require router
const restaurantRouter = require('./routers/restaurant');
const userAuthRouter = require('./routers/userAuth');
const adminAuthRouter = require('./routers/adminAuth');
const paymentRouter = require('./routers/paymentRoute.js');
const { initialize } = require('./config/socket');

// Initialize Socket.io
const io = socketIo(server);

// Listen for incoming connections
initialize(server)

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://swiggy-clone-kappa.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/restaurants', restaurantRouter);
app.use('/userAuth', userAuthRouter);
app.use('/adminAuth', adminAuthRouter);
app.use('/payment', paymentRouter)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRECT
})

app.get('/api/getkey', (req, res) => res.json({success: true, key: process.env.RAZORPAY_API_KEY}))


connectDB();

server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);


