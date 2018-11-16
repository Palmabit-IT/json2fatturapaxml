'use strict'

const Joi = require('joi')
const schema = require('./schema')

module.exports = value => Joi.validate(value, schema)
