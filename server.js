require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const questionRoutes = require('./routes/questions')
const userRoutes = require('./routes/user')

// express app
const app = express()

// const corsOptions = {
//     origin: 'https://codeoverflow.netlify.app',
//     credentials: true,
// };

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())

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
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening to port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

