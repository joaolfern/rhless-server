import Joi from 'joiptbr'

const userValidation = {
  create: (req, res) => Joi.object({
    name: Joi
      .string()
      .max(251)
      .required()
      .label('Nome'),
    status: Joi
      .string()
      .optional()
      .max(50)
      .label('Status'),
    picture: Joi
      .string()
      .allow('')
      .optional()
      .max(251)
      .label('Foto de perfil'),
    type: Joi
      .string()
      .optional()
      .max(50)
      .label('Tipo'),
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
    confirmPassword: Joi
      .string()
      .required()
      .label('Confirmação de senha'),
    resume: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .label('Currículo'),
  }).validate(req.body),
  update: (req, res) => Joi.object({
    _id: Joi
      .string()
      .max(251)
      .optional()
      .allow('')
      .label('_id'),
    name: Joi
      .string()
      .max(251)
      .optional()
      .allow('')
      .label('Nome'),
    status: Joi
      .string()
      .optional()
      .allow('')
      .max(50)
      .label('Status'),
    picture: Joi
      .string()
      .allow('')
      .optional()
      .allow('')
      .max(251)
      .label('Foto de perfil'),
    type: Joi
      .string()
      .optional()
      .allow('')
      .max(50)
      .label('Tipo'),
    email: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .email()
      .label('Email'),
    password: Joi
      .string()
      .max(251)
      .optional()
      .allow('')
      .label('Senha'),
    confirmPassword: Joi
      .string()
      .optional()
      .allow('')
      .label('Confirmação de senha')
  }).validate(req.body)
}

export default userValidation
