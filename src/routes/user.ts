const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/:id', userController.show)
router.patch('/:id', userController.update)
router.post('/', userController.create)
router.delete('/:id', userController.delete)

module.exports = router
