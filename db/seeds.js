const mongoose = require ('mongoose')
const { dbURI } = require ('../config/environment')
const Period = require ('../models/period')
const User = require ('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
  .then(() => {
    return User.create([
      {
        username: 'EllenStarbuck',
        email: 'ellen@email',
        password: 'pass',
        passwordConfirmation: 'pass'
      },
      {
        username: 'lady',
        email: 'lady@email',
        password: 'pass',
        passwordConfirmation: 'pass'
      }       
    ])
  })
  .then(createdUsers => {
    console.log(`${(createdUsers.length)} users created `) 
    return Period.create([
      {
        dateOfPeriod: '2020-04-21T00:00:00.0000',
        daysOfPeriod: 5,
        cycleLength: 27,
        user: createdUsers[0],
      },
      {
        dateOfPeriod: '2020-04-20T00:00:00.0000',
        daysOfPeriod: 5,
        cycleLength: 27,
        user: createdUsers[1],
      }
    ])
  })
  .then(createdPeriods => console.log(`${(createdPeriods.length)} periods made`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())

})
