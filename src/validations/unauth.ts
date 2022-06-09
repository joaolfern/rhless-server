import Joi from 'joiptbr'

const unauthValidation = {
  requestCreation: (req, res) =>  Joi.object({
    name: Joi
      .string()
      .max(251)
      .required()
      .label('Nome'),
    email: Joi
      .string()
      .max(500)
      .required()
      .email()
      .label('Email'),
    picture: Joi
      .string()
      .allow('')
      .optional()
      .max(251)
      .label('Foto de perfil'),
    password: Joi
      .string()
      .max(251)
      .required()
      .label('Senha'),
    confirmPassword: Joi
      .string()
      .required()
      .label('Confirmação de senha')
  }).validate(req.body),
  login: (req, res) =>  Joi.object({
    email: Joi
      .string()
      .max(500)
      .required()
      .email()
      .label('Email'),
    password: Joi
      .string()
      .max(251)
      .required()
      .label('Senha'),

  }).validate(req.body)
}

export default unauthValidation
