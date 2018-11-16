'use strict'

const Joi = require('joi')

const FatturaElettronicaHeaderSchema = require('./FatturaElettronicaHeaderSchema')
const FatturaElettronicaBodySchema = require('./FatturaElettronicaBodySchema')

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: FatturaElettronicaHeaderSchema, // 1
  FatturaElettronicaBody: FatturaElettronicaBodySchema // 2
})
