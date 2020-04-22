const router = require('express').Router()
const periodDay = require('../controllers/periodDay')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')


//all the periods
router.route('/periods')
  .get(secureRoute, periodDay.index)
  .post(secureRoute, periodDay.create)

//one of the periods
router.route('/periods/:id')
  .get(secureRoute, periodDay.show)
  .put(secureRoute, periodDay.update)
  .delete(secureRoute, periodDay.destroy)

  //login
router.route('/register')
  .post(users.register)

  //register
router.route('/login')
  .post(users.login)  



module.exports = router