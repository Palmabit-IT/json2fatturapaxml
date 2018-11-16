'use strict'

const Joi = require('joi')

const RegimiFiscaliValidi = ['RF01', 'RF02', 'RF03', 'RF04', 'RF05', 'RF06', 'RF07', 'RF08', 'RF09','RF10', 'RF11', 'RF12', 'RF13', 'RF14', 'RF15', 'RF16', 'RF17', 'RF18', 'RF19']

const IdPaeseSchema = Joi.string().uppercase().length(2)
const IdCodiceSchema = Joi.string().alphanum().min(2).max(28)

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

const DatiAnagraficiCedentePrestatoreSchema = Joi.object().keys({
  IdFiscaleIVA: Joi.object().keys({
    IdPaese: IdPaeseSchema.required(),
    IdCodice: IdCodiceSchema.required()
  }).required(),
  Anagrafica: Joi.object().keys({
    Denominazione: Joi.string().alphanum().min(1).max(80),
    Nome: Joi.string().alphanum().min(1).max(60),
    Cognome: Joi.string().alphanum().min(1).max(60),
    RegimeFiscale: Joi.valid(RegimiFiscaliValidi).required()
  }).required()
}).required()

const SedeCedentePrestatoreSchema = Joi.object().keys({
  Indirizzo: Joi.string().alphanum().min(1).max(60).required(),
  NumeroCivico: Joi.string().alphanum().min(1).max(8),
  CAP: Joi.string().regex(/^\d{5}$/).required(),
  Comune: Joi.string().min(1).max(60).required(),
  Provincia: Joi.string().uppercase().length(2),
  Nazione: Joi.string().uppercase().length(2).required()
}).required()

const StabileOrganizzazioneCedentePrestatoreSchema = Joi.object().keys({
  Indirizzo: Joi.string().alphanum().min(1).max(60).required(),
  NumeroCivico: Joi.string().alphanum().min(1).max(8),
  CAP: Joi.string().regex(/^\d{5}$/).required(),
  Comune: Joi.string().min(1).max(60).required(),
  Provincia: Joi.string().uppercase().length(2),
  Nazione: Joi.string().uppercase().length(2).required()
})

const CedentePrestatoreSchema = Joi.object().keys({
  DatiAnagrafici: DatiAnagraficiCedentePrestatoreSchema,
  Sede: SedeCedentePrestatoreSchema,
  StabileOrganizzazione: StabileOrganizzazioneCedentePrestatoreSchema
}).required()
const FatturaElettronicaHeaderSchema = Joi.object().keys({
  DatiTrasmissione: DatiTrasmissioneSchema,
  CedentePrestatore: CedentePrestatoreSchema
}).required()

module.exports = Joi.object().keys({
  FatturaElettronicaHeader: FatturaElettronicaHeaderSchema
})
