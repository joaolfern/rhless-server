"use strict";const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/:_id', userController.show)
router.patch('/:_id', userController.update)
router.post('/', userController.create)
router.delete('/:_id', userController.delete)

module.exports = router
