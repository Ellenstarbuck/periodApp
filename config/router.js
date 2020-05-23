const router = require('express').Router()
const periodDay = require('../controllers/periodDay')
const users = require('../controllers/auth')
const period = require('../controllers/periodFirst')
const secureRoute = require('../lib/secureRoute')

router.route('/home')
  .post(period.create)

//all the periods
router.route('/periods')
  .get(secureRoute, periodDay.index)
  .post(secureRoute, periodDay.create)
  .delete(secureRoute, periodDay.destroyProfile)

//one of the periods
router.route('/periods/:id')
  .get(periodDay.show)
  .put(secureRoute, periodDay.update)
  .delete(secureRoute, periodDay.destroy)

  //login
router.route('/register')
  .post(users.register)

  //register
router.route('/login')
  .post(users.login)  

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Route Not Found' }))


module.exports = router