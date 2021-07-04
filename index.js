// Importing packages
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'

// others
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// importing Routes files
import roleRoutes from './routes/roleRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import userRoutes from './routes/userRoutes.js'
import studentRoutes from './routes/studentRoutes.js'

// Configuration
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

// Connecting Database
connectDB()


// Routes Middlewares
app.use('/role',roleRoutes)
app.use('/school',schoolRoutes)
app.use('/user',userRoutes)
app.use('/student',studentRoutes)


// API end points

app.get('/',(req,res) => {
    res.send('API is running...')
})

// Error Middlewares
app.use(notFound)
app.use(errorHandler)

// Server

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold))