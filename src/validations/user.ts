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
      .label('Confirmação de senha')
  }).validate(req.body)
}

export default userValidation
