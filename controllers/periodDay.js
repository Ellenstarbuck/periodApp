const PeriodDay = require('../models/periodDay')
const User = require('../models/user')

//user gets all their periods back

function index(req, res) {
    User
      .findById(req.currentUser._id)
      .populate('createdPeriods')
      .then(user => {
        if (!user) throw new Error ('Not Found') 
        return res.status(200).json(user)
      }) 
      .catch(err => res.json(err))
}

//user makes a new period

function create(req, res ) {
  req.body.user = req.currentUser
  PeriodDay
    .create(req.body)
    .then(period => res.status(201).json(period))
    .catch(err => res.json(err))
}

//update a period record

function update(req, res, next ) {
  req.body.user = req.currentUser
  PeriodDay
    .findById(req.params.id)
    .then(period => {
      if (!period) throw new Error('Not Found')
      if (!period.user.equals(req.currentUser._id)) throw new Error ('Not Authorized)')
      Object.assign(period, req.body)
      period.save()
    })
    .then(period => res.status(200).json(period))
    .catch(next)  
    }


//delete a record

function destroy(req, res, next) {
  req.body.user = req.currentUser
  PeriodDay
    .findByIdAndDelete(req.params.id)
    .then(period => {
      if (!period.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    })
    .then(() => res.status(204).json({ message: 'successfully deleted'}))
    .catch(next)
}

//user gets one of their periods back

function show(req, res, next) {
  req.body.user = req.currentUser
  PeriodDay
    .findById(req.params.id)
    .then(period => {
      if (!period) throw new Error ('Not Found')
      if (!period.user.equals(req.currentUser._id)) throw new Error ('Unauthorized') 
      return res.status(200).json(period)
    }) 
    .catch(next) 
}

module.exports = { index, show, create, update, destroy }