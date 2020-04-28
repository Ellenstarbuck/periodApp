const Period = require ('../models/period')


function create(req, res) {
  req.body.user = req.currentUser
  Period
  .create(req.body)
  .then(period => res.status(201).json(period))
  .catch(err => res.json(err))
}


module.exports = { create } 