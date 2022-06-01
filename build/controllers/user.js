"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);




module.exports = {
  index: async (req, res) => {
    try {
      const users = await _user2.default.find()
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req, res) => {
    const { id } = req.params
    try {
      const user = await _user2.default.findById(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req, res) => {
    const body = req.body
    const User = new (0, _user2.default)(body)

    try {
      User.save()
      res.status(200).json(`Usuário cadastrado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  update: async (req, res) => {
    const { _id } = req.params
    const body = req.body
    try {
      await _user2.default.updateOne(
        { _id },
        body
      )

      res.json(`Usuário atualizado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  delete: async (req, res) => {
    const { _id } = req.params
    try {
      await _user2.default.deleteOne({ _id })

      res.json(`Usuário deletado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
