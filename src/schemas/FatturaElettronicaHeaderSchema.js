'use strict'

const Joi = require('joi')

const RegimiFiscaliValidi = ['RF01', 'RF02', 'RF03', 'RF04', 'RF05', 'RF06', 'RF07', 'RF08', 'RF09', 'RF10', 'RF11', 'RF12', 'RF13', 'RF14', 'RF15', 'RF16', 'RF17', 'RF18', 'RF19']

const IdPaeseSchema = Joi.string().uppercase().length(2)
const IdCodiceSchema = Joi.string().alphanum().min(2).max(28)
const EmailSchema = Joi.string().email().min(2).max(256)
const RiferimentoAmministrazioneSchema = Joi.string().alphanum().min(1).max(20)
const IdFiscaleIVASchema = Joi.object().keys({
  IdPaese: IdPaeseSchema.required(),
  IdCodice: IdCodiceSchema.required()
})
const CodiceFiscaleSchema = Joi.string().alphanum().min(11).max(16)
const IndirizzoSchema = Joi.string().alphanum().min(1).max(60)
const NumeroCivicoSchema = Joi.string().alphanum().min(1).max(8)

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
    then: EmailSchema.required(),
    otherwise: Joi.forbidden()
  })
}).required()

const DatiAnagraficiCedentePrestatoreSchema = Joi.object().keys({
  IdFiscaleIVA: IdFiscaleIVASchema.required(),
  Anagrafica: Joi.object().keys({
    Denominazione: Joi.string().alphanum().min(1).max(80),
    Nome: Joi.string().alphanum().min(1).max(60),
    Cognome: Joi.string().alphanum().min(1).max(60),
    RegimeFiscale: Joi.valid(RegimiFiscaliValidi).required()
  }).required()
}).required()

const SedeCedentePrestatoreSchema = Joi.object().keys({
  Indirizzo: IndirizzoSchema.required(),
  NumeroCivico: Joi.string().alphanum().min(1).max(8),
  CAP: Joi.string().regex(/^\d{5}$/).required(),
  Comune: Joi.string().min(1).max(60).required(),
  Provincia: Joi.string().uppercase().length(2),
  Nazione: Joi.string().uppercase().length(2).required()
}).required()

const StabileOrganizzazioneSchema = Joi.object().keys({
  Indirizzo: IndirizzoSchema.required(),
  NumeroCivico: NumeroCivicoSchema,
  CAP: Joi.string().regex(/^\d{5}$/).required(),
  Comune: Joi.string().min(1).max(60).required(),
  Provincia: Joi.string().uppercase().length(2),
  Nazione: Joi.string().uppercase().length(2).required()
})

const IscrizioneREASchema = Joi.object().keys({
  Ufficio: Joi.string().uppercase().length(2).required(),
  NumeroREA: Joi.string().alphanum().min(1).max(20).required(),
  CapitaleSociale: Joi.number().precision(2).positive(),
  SocioUnico: Joi.valid('SU', 'SM'),
  StatoLiquidazione: Joi.valid('LS', 'LN').required()
})

const ContattiCedentePrestatoreSchema = Joi.object().keys({
  Telefono: Joi.string().min(5).max(12),
  Fax: Joi.string().min(5).max(12),
  Email: EmailSchema
})

const CedentePrestatoreSchema = Joi.object().keys({
  DatiAnagrafici: DatiAnagraficiCedentePrestatoreSchema,
  Sede: SedeCedentePrestatoreSchema,
  StabileOrganizzazione: StabileOrganizzazioneSchema,
  IscrizioneREA: IscrizioneREASchema,
  Contatti: ContattiCedentePrestatoreSchema,
  RiferimentoAmministrazione: RiferimentoAmministrazioneSchema
}).required()

const RappresentanteFiscaleSchema = Joi.object().keys({
  DatiAnagrafici: Joi.object().keys({
    IdFiscaleIVA: IdFiscaleIVASchema.required(),
    CodiceFiscale: CodiceFiscaleSchema,
    Anagrafica: Joi.object().keys({
      Denominazione: Joi.string().alphanum().min(1).max(80),
      Nome: Joi.string().alphanum().min(1).max(60),
      Cognome: Joi.string().alphanum().min(1).max(60),
      Titolo: Joi.string().min(2).max(10),
      CodEORI: Joi.string().min(13).max(17)
    }).required()
  }).required()
})

const CessionarioCommittenteSchema = Joi.object().keys({
  DatiAnagrafici: Joi.object().keys({
    IdFiscaleIVA: IdFiscaleIVASchema,
    CodiceFiscale: CodiceFiscaleSchema,
    Anagrafica: Joi.object().keys({
      Denominazione: Joi.string().alphanum().min(1).max(80),
      Nome: Joi.string().alphanum().min(1).max(60),
      Cognome: Joi.string().alphanum().min(1).max(60),
      Titolo: Joi.string().min(2).max(10),
      CodEORI: Joi.string().min(13).max(17)
    }).required()
  }).required(),
  Sede: Joi.object().keys({
    Indirizzo: IndirizzoSchema.required(),
    NumeroCivico: NumeroCivicoSchema,
    CAP: Joi.string().regex(/^\d{5}$/).required(),
    Comune: Joi.string().min(1).max(60).required(),
    Provincia: Joi.string().uppercase().length(2),
    Nazione: Joi.string().uppercase().length(2).required()
  }).required(),
  StabileOrganizzazione: StabileOrganizzazioneSchema,
  RappresentanteFiscale: Joi.object().keys({
    IdFiscaleIVA: IdFiscaleIVASchema.required(),
    Denominazione: Joi.string().alphanum().min(1).max(80),
    Nome: Joi.string().alphanum().min(1).max(60),
    Cognome: Joi.string().alphanum().min(1).max(60)
  })
}).required()

const TerzoIntermediarioOSoggettoEmittenteSchema = Joi.object().keys({
  DatiAnagrafici: Joi.object().keys({
    IdFiscaleIVA: IdFiscaleIVASchema,
    CodiceFiscale: CodiceFiscaleSchema,
    Anagrafica: Joi.object().keys({
      Denominazione: Joi.string().alphanum().min(1).max(80),
      Nome: Joi.string().alphanum().min(1).max(60),
      Cognome: Joi.string().alphanum().min(1).max(60),
      Titolo: Joi.string().min(2).max(10),
      CodEORI: Joi.string().min(13).max(17)
    }).required()
  }).required()
})

const SoggettoEmittenteSchema = Joi.valid('CC', 'TZ')

const FatturaElettronicaHeaderSchema = Joi.object().keys({
  DatiTrasmissione: DatiTrasmissioneSchema, // 1.1
  CedentePrestatore: CedentePrestatoreSchema, // 1.2
  RappresentanteFiscale: RappresentanteFiscaleSchema, // 1.3
  CessionarioCommittente: CessionarioCommittenteSchema, // 1.4
  TerzoIntermediarioOSoggettoEmittente: TerzoIntermediarioOSoggettoEmittenteSchema, // 1.5
  SoggettoEmittente: SoggettoEmittenteSchema // 1.6
}).required()

module.exports = FatturaElettronicaHeaderSchema