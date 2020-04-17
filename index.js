const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')
app.use(logger)  

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true , useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is connected')
  })



app.use((req, res, next) => {
  console.log(`Ìncoming ${req.method} to ${req.url}`)
  next()
})

app.get('/', (req, res) => {
    res.json({ message: 'HEY GIRL' })
  })



app.listen(port, () => console.log(`I am the backend, I hear all, I am listening at ${port}`))
