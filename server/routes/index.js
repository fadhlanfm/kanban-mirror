const router = require('express').Router()
const UserController = require('../controllers/UserController')
const tasks = require('./tasks')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.post('/googleSignIn', UserController.googleSignIn)
router.use('/tasks', tasks)
router.get('/*', UserController.notFound)
router.delete('/*', UserController.notFound)
router.post('/*', UserController.notFound)
router.put('/*', UserController.notFound)


module.exports = router