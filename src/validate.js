'use strict'

const Joi = require('joi')
const schema = require('./schemas/FatturaElettronicaSchema')

module.exports = value => Joi.validate(value, schema)
