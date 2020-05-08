const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares')

router.use(authentication)
router.post('/', TaskController.create)
router.get('/', TaskController.getAll)
router.get('/:id', authorization, TaskController.getById)
router.put('/:id', authorization, TaskController.update)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router;