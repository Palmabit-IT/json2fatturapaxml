'use strict'

const Joi = require('joi')

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: Joi.object().keys({
    DatiTrasmissione: Joi.object().keys().required()
  }).required()
})
