const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connectDB } = require('./config/db')
const app = express()
const port = 8000 || process.env.PORT

// require router
const restaurantRouter = require('./routers/restaurant')



// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/restaurant', restaurantRouter)

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

connectDB()
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))