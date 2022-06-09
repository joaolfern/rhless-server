import Joi from 'joiptbr'

const jobValidation = {
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
    department: Joi
      .string()
      .allow('')
      .optional()
      .max(251)
      .label('Foto de perfil'),
    city: Joi
      .string()
      .allow('')
      .optional()
      .max(251)
      .label('Cidade'),
    type: Joi
      .string()
      .optional()
      .max(50)
      .label('Tipo'),
    description: Joi
      .string()
      .max(500)
      .required()
      .label('Descrição'),
    author: Joi
      .string()
      .max(500)
      .required()
      .label('Autor')
  }).validate(req.body),
}

export default jobValidation
