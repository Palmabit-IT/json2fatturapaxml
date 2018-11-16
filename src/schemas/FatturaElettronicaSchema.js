'use strict'

const Joi = require('joi')

const FatturaElettronicaHeaderSchema = require('./FatturaElettronicaHeaderSchema')

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: FatturaElettronicaHeaderSchema // 1
})
