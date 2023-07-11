const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000 || process.env.PORT;

// require router
const restaurantRouter = require('./routers/restaurant');
const authRouter = require('./routers/auth');

// Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/restaurants', restaurantRouter);
app.use('/auth', authRouter);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

connectDB();
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
