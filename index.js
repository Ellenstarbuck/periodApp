const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const router = require('./config/router')
app.use(bodyParser.json())
const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
 

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



app.use(bodyParser.json())

app.use(logger) 

app.use('/api', router)

app.use(errorHandler)

app.use(express.static(`${__dirname}/dist`))
app.use(express.static(`${__dirname}/public`))
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))


app.listen(port, () => console.log(`I am the backend, I hear all, I am listening at ${port}`))
// app.listen(4000, () => console.log('Static server on port 4000'))

module.exports = app