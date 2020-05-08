const mongoose = require ('mongoose')
const { dbURI } = require ('../config/environment')
const Period = require ('../models/period')
const User = require ('../models/user')
const PeriodDay = require ('../models/periodDay')

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
    return Promise.all([
    Period.create([
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
    ]),
    createdUsers
    ])
  })
  .then(data => {
    const [ periods, createdUsers ] = data
    console.log(`${periods.length} periods created`)
    return PeriodDay.create([
      {
      periodToday: true,
      date: '2020-04-18T00:00:00.0000',
      symptoms:  
        {
          bleeding: 'spotting',
          cramps: 'a mild twinge',
          mood: 'I would probably cry over spilt milk',
          bloats: 'farty'
        },
      user: createdUsers[0]
      },
      {
        periodToday: true,
        date: '2020-04-19T00:00:00.0000',
        symptoms: 
          {
            bleeding: 'light',
            cramps: 'the worst',
            mood: 'normal, whatever that is',
            bloats: 'nauseous',
            foodCravings: 'none'
          },
        user: createdUsers[0]
        },
        {
          periodToday: true,
          date: '2020-04-19T00:00:00.0000',
          symptoms: 
            {
              bleeding: 'it\'s like when the lift doors open in The Shining',
              cramps: 'distracting but beareable',
              boobs: 'they\'re okay, thanks for asking',
              energy: 'I could party',
            },
          user: createdUsers[1]
        }
    ])
  })
  .then(createdPeriodsToday => console.log(`${(createdPeriodsToday.length)} periods today logged`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())

})
