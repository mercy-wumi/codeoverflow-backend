require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const questionRoutes = require('./routes/questions')
const userRoutes = require('./routes/user')

// express app
const app = express()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/questions', questionRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening to port 4000')
        })
    })
    .catch((err) => {
        console.log(err)
    })

