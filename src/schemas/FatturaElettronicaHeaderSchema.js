'use strict'

const BaseJoi = require('joi')
const JoiCountryExtension = require('joi-country-extension')
const Joi = BaseJoi.extend(JoiCountryExtension)

const RegimiFiscaliValidi = [
  'RF01',
  'RF02',
  'RF04',
  'RF05',
  'RF06',
  'RF07',
  'RF08',
  'RF09',
  'RF10',
  'RF11',
  'RF12',
  'RF13',
  'RF14',
  'RF15',
  'RF16',
  'RF17',
  'RF18',
  'RF19'
]

const IdPaeseSchema = Joi.string().country()
const IdCodiceSchema = Joi.string()
  .alphanum()
  .min(2)
  .max(28)
const EmailSchema = Joi.string()
  .email()
  .min(2)
  .max(256)
const RiferimentoAmministrazioneSchema = Joi.string()
  .min(1)
  .max(20)
const IdFiscaleIVASchema = Joi.object().keys({
  IdPaese: IdPaeseSchema.required(),
  IdCodice: IdCodiceSchema.required()
})
const CodiceFiscaleSchema = Joi.string()
  .alphanum()
  .min(11)
  .max(16)
const IndirizzoSchema = Joi.string()
  .min(1)
  .max(60)
const NumeroCivicoSchema = Joi.string()
  .min(1)
  .max(8)

const ContattiTrasmittenteSchema = Joi.object().keys({
  Telefono: Joi.string()
    .min(5)
    .max(12), // 1.1.5.1
  Email: EmailSchema // 1.1.5.2
})

const DatiTrasmissioneSchema = Joi.object()
  .keys({
    IdTrasmittente: Joi.object()
      .keys({
        IdPaese: IdPaeseSchema.required(),
        IdCodice: Joi.string()
          .alphanum()
          .required()
          .min(2)
          .max(28)
      })
      .required(),
    ProgressivoInvio: Joi.string()
      .alphanum()
      .required()
      .min(1)
      .max(10),
    FormatoTrasmissione: Joi.valid('FPA12', 'FPR12').required(),
    CodiceDestinatario: Joi.alternatives()
      .when('FormatoTrasmissione', {
        is: 'FPA12',
        then: Joi.string()
          .alphanum()
          .length(6),
        otherwise: Joi.string()
          .alphanum()
          .length(7)
      })
      .required(),
    ContattiTrasmittente: ContattiTrasmittenteSchema, // 1.1.5
    PECDestinatario: Joi.alternatives().when('CodiceDestinatario', {
      // FIXME
      is: '0000000',
      then: EmailSchema.required(),
      otherwise: Joi.forbidden()
    })
  })
  .required()

const DatiAnagraficiCedentePrestatoreSchema = Joi.object()
  .keys({
    IdFiscaleIVA: IdFiscaleIVASchema.required(), // 1.2.1.1
    CodiceFiscale: CodiceFiscaleSchema, // 1.2.1.2
    Anagrafica: Joi.object()
      .keys({
        Denominazione: Joi.string()
          .min(1)
          .max(80), // 1.2.1.3.1
        Nome: Joi.string()
          .min(1)
          .max(60), // 1.2.1.3.2
        Cognome: Joi.string()
          .min(1)
          .max(60), // 1.2.1.3.3
        Titolo: Joi.string()
          .min(2)
          .max(10), // 1.2.1.3.4
        CodEORI: Joi.string()
          .min(13)
          .max(17) // 1.2.1.3.5
      })
      .required(),
    AlboProfessionale: Joi.string()
      .min(1)
      .max(60), // 1.2.1.4
    ProvinciaAlbo: Joi.string().length(2), // 1.2.1.5
    NumeroIscrizioneAlbo: Joi.string()
      .min(1)
      .max(60), // 1.2.1.6
    DataIscrizioneAlbo: Joi.string()
      .isoDate()
      .raw()
      .notes('YYYY-MM-DD'), // 1.2.1.7
    RegimeFiscale: Joi.valid(RegimiFiscaliValidi).required() // 1.2.1.8
  })
  .required()

const SedeCedentePrestatoreSchema = Joi.object()
  .keys({
    Indirizzo: IndirizzoSchema.required(),
    NumeroCivico: Joi.string()
      .min(1)
      .max(8),
    CAP: Joi.string()
      .regex(/^\d{5}$/)
      .required(),
    Comune: Joi.string()
      .min(1)
      .max(60)
      .required(),
    Nazione: Joi.string()
      .uppercase()
      .length(2)
      .required(),
    Provincia: Joi.string().when('Nazione', {
      is: 'IT',
      then: Joi.string()
        .uppercase()
        .length(2)
        .required(),
      otherwise: Joi.string()
        .uppercase()
        .length(2)
        .optional()
        .allow('')
    })
    // Provincia: Joi.string().uppercase().length(2),
    // Nazione: Joi.string().uppercase().length(2).required()
  })
  .required()

const StabileOrganizzazioneSchema = Joi.object().keys({
  Indirizzo: IndirizzoSchema.required(), // 1.2.3.1
  NumeroCivico: NumeroCivicoSchema, // 1.2.3.2
  CAP: Joi.string()
    .regex(/^\d{5}$/)
    .required(), // 1.2.3.3
  Comune: Joi.string()
    .min(1)
    .max(60)
    .required(), // 1.2.3.4
  Provincia: Joi.string()
    .uppercase()
    .length(2), // 1.2.3.5
  Nazione: Joi.string()
    .uppercase()
    .length(2)
    .required() // 1.2.3.6
})

const IscrizioneREASchema = Joi.object().keys({
  Ufficio: Joi.string()
    .uppercase()
    .length(2)
    .required(), // 1.2.4.1
  NumeroREA: Joi.string()
    .alphanum()
    .min(1)
    .max(20)
    .required(), // 1.2.4.2
  CapitaleSociale: Joi.number()
    .precision(2)
    .positive(), // 1.2.4.3
  SocioUnico: Joi.valid('SU', 'SM'), // 1.2.4.4
  StatoLiquidazione: Joi.valid('LS', 'LN').required() // 1.2.4.5
})

const ContattiCedentePrestatoreSchema = Joi.object().keys({
  Telefono: Joi.string()
    .min(5)
    .max(12), // 1.2.5.1
  Fax: Joi.string()
    .min(5)
    .max(12), // 1.2.5.2
  Email: EmailSchema // 1.2.5.3
})

const CedentePrestatoreSchema = Joi.object()
  .keys({
    DatiAnagrafici: DatiAnagraficiCedentePrestatoreSchema, // 1.2.1
    Sede: SedeCedentePrestatoreSchema, // 1.2.2
    StabileOrganizzazione: StabileOrganizzazioneSchema, // 1.2.3
    IscrizioneREA: IscrizioneREASchema, // 1.2.4
    Contatti: ContattiCedentePrestatoreSchema, // 1.2.5
    RiferimentoAmministrazione: RiferimentoAmministrazioneSchema // 1.2.6
  })
  .required()

const RappresentanteFiscaleSchema = Joi.object().keys({
  DatiAnagrafici: Joi.object()
    .keys({
      IdFiscaleIVA: IdFiscaleIVASchema.required(), // 1.3.1.1
      CodiceFiscale: CodiceFiscaleSchema, // 1.3.1.2
      Anagrafica: Joi.object()
        .keys({
          Denominazione: Joi.string()
            .min(1)
            .max(80),
          Nome: Joi.string()
            .min(1)
            .max(60),
          Cognome: Joi.string()
            .min(1)
            .max(60),
          Titolo: Joi.string()
            .min(2)
            .max(10),
          CodEORI: Joi.string()
            .min(13)
            .max(17)
        })
        .required()
    })
    .required() // 1.3.1
})

const CessionarioCommittenteSchema = Joi.object()
  .keys({
    DatiAnagrafici: Joi.object()
      .keys({
        IdFiscaleIVA: IdFiscaleIVASchema,
        CodiceFiscale: CodiceFiscaleSchema,
        Anagrafica: Joi.object()
          .keys({
            Denominazione: Joi.string()
              .min(1)
              .max(80),
            Nome: Joi.string()
              .min(1)
              .max(60),
            Cognome: Joi.string()
              .min(1)
              .max(60),
            Titolo: Joi.string()
              .min(2)
              .max(10),
            CodEORI: Joi.string()
              .min(13)
              .max(17)
          })
          .required()
      })
      .or('IdFiscaleIVA', 'CodiceFiscale')
      .required(),
    Sede: Joi.object()
      .keys({
        Indirizzo: IndirizzoSchema.required(),
        NumeroCivico: NumeroCivicoSchema,
        CAP: Joi.string()
          .regex(/^\d{5}$/)
          .required(),
        Comune: Joi.string()
          .min(1)
          .max(60)
          .required(),
        Provincia: Joi.string()
          .uppercase()
          .length(2),
        Nazione: Joi.string()
          .uppercase()
          .length(2)
          .required()
      })
      .required(),
    StabileOrganizzazione: StabileOrganizzazioneSchema, // 1.4.3
    RappresentanteFiscale: Joi.object().keys({
      IdFiscaleIVA: IdFiscaleIVASchema.required(),
      Denominazione: Joi.string()
        .min(1)
        .max(80),
      Nome: Joi.string()
        .min(1)
        .max(60),
      Cognome: Joi.string()
        .min(1)
        .max(60)
    })
  })
  .required()

const TerzoIntermediarioOSoggettoEmittenteSchema = Joi.object().keys({
  DatiAnagrafici: Joi.object()
    .keys({
      IdFiscaleIVA: IdFiscaleIVASchema,
      CodiceFiscale: CodiceFiscaleSchema,
      Anagrafica: Joi.object()
        .keys({
          Denominazione: Joi.string()
            .min(1)
            .max(80),
          Nome: Joi.string()
            .min(1)
            .max(60),
          Cognome: Joi.string()
            .min(1)
            .max(60),
          Titolo: Joi.string()
            .min(2)
            .max(10),
          CodEORI: Joi.string()
            .min(13)
            .max(17)
        })
        .required()
    })
    .required()
})

const SoggettoEmittenteSchema = Joi.valid('CC', 'TZ')

const FatturaElettronicaHeaderSchema = Joi.object()
  .keys({
    DatiTrasmissione: DatiTrasmissioneSchema, // 1.1
    CedentePrestatore: CedentePrestatoreSchema, // 1.2
    RappresentanteFiscale: RappresentanteFiscaleSchema, // 1.3
    CessionarioCommittente: CessionarioCommittenteSchema, // 1.4
    TerzoIntermediarioOSoggettoEmittente: TerzoIntermediarioOSoggettoEmittenteSchema, // 1.5
    SoggettoEmittente: SoggettoEmittenteSchema // 1.6
  })
  .required()

module.exports = FatturaElettronicaHeaderSchema
