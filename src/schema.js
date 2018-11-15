'use strict'

const Joi = require('joi')

const FatturaElettronicaHeaderSchema = Joi.object().keys({
  DatiTrasmissione: Joi.object().keys({
    IdTrasmittente: Joi.object().keys().required()
  }).required()
}).required()

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: FatturaElettronicaHeaderSchema
})
