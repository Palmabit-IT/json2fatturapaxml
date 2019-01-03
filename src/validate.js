'use strict'

const Joi = require('joi')
const schema = require('./schemas/FatturaElettronicaSchema')
const options = {
  abortEarly: false
}

module.exports = value => Joi.validate(value, schema, options)
