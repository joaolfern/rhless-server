import Joi from 'joiptbr'

const candidateValidation = {
  create: (req, res) => Joi.object({
    user: Joi
      .string()
      .max(500)
      .required()
      .label('Candidato'),
    job: Joi
      .string()
      .max(500)
      .required()
      .label('Vaga'),
    resume: Joi
      .string()
      .max(500)
      .required()
      .label('Currículo'),
  }).validate(req.body),
  update: (req, res) => Joi.object({
    user: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .label('Candidato'),
    job: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .label('Vaga'),
    resume: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .label('Currículo'),
    status: Joi
      .string()
      .max(500)
      .optional()
      .allow('')
      .label('Status'),
  }).validate(req.body),
}

export default candidateValidation
