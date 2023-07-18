const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(config.url)
    .then (() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log("handle this error later")
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app