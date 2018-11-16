'use strict'

const Joi = require('joi')

const DatiTrasmissioneSchema = Joi.object().keys({
  IdTrasmittente: Joi.object().keys({
    IdPaese: Joi.string().required().length(2),
    IdCodice: Joi.string().alphanum().required().min(2).max(28)
  }).required(),
  ProgressivoInvio: Joi.string().alphanum().required().min(1).max(10),
  FormatoTrasmissione: Joi.valid('FPA12', 'FPR12').required(),
  CodiceDestinatario: Joi.alternatives().when('FormatoTrasmissione', {
    is: 'FPA12',
    then: Joi.string().alphanum().length(6),
    otherwise: Joi.string().alphanum().length(7)
  }).required(),
  PECDestinatario: Joi.alternatives().when('CodiceDestinatario', { // FIXME
    is: '0000000',
    then: Joi.string().email().min(2).max(256).required(),
    otherwise: Joi.forbidden()
  })
}).required()

const FatturaElettronicaHeaderSchema = Joi.object().keys({
  DatiTrasmissione: DatiTrasmissioneSchema
}).required()

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: FatturaElettronicaHeaderSchema
})
