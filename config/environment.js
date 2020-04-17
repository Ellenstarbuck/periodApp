const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/period-app-api'
const secret = process.env.SECRET || 'omg secret stuff'

module.exports = { port, dbURI, secret }