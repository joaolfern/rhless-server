"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


const UserSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

exports. default = _mongoose2.default.model('User', UserSchema)
