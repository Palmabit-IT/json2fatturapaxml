'use strict'

const Joi = require('joi')

const TipiDocumentiValidi = ['TD01', 'TD02', 'TD02', 'TD03', 'TD04', 'TD05', 'TD06']
const TipiRitenuteValide = ['RT01', 'RT02']
const TipiCassaValidi = ['TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TC06', 'TC07', 'TC08', 'TC09', 'TC10', 'TC11', 'TC12', 'TC13', 'TC14', 'TC15', 'TC16', 'TC17', 'TC18', 'TC19', 'TC20', 'TC21', 'TC22']
const NaturaValidi = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7']

const IdPaeseSchema = Joi.string().uppercase().length(2)
const IdCodiceSchema = Joi.string().alphanum().min(2).max(28)
const IdFiscaleIVASchema = Joi.object().keys({
  IdPaese: IdPaeseSchema.required(),
  IdCodice: IdCodiceSchema.required()
})
const CodiceFiscaleSchema = Joi.string().alphanum().min(11).max(16)

const DatiRitenutaSchema = Joi.object().keys({
  TipoRitenuta: Joi.valid(TipiRitenuteValide).required(),
  ImportoRitenuta: Joi.number().required(), // min 4 max 15
  AliquotaRitenuta: Joi.number().min(0).max(100).precision(4).required(),
  CausalePagamento: Joi.string().min(1).max(2).required()
})

const DatiBolloSchema = Joi.object().keys({
  BolloVirtuale: Joi.valid('SI').required(),
  ImportoBollo: Joi.number().positive().required()
})

const DatiCassaPrevidenzialeItemSchema = Joi.object().keys({
  TipoCassa: Joi.valid(TipiCassaValidi).required(),
  AlCassa: Joi.number().min(0).max(100).precision(4).required(),
  ImportoContributoCassa: Joi.number().required(),
  ImponibileCassa: Joi.number(),
  AliquotaIVA: Joi.number().min(0).max(100).precision(4).required(),
  Ritenuta: Joi.valid('SI'),
  Natura: Joi.valid(NaturaValidi),
  RiferimentoAmministrazione: Joi.string().min(1).max(20)
}).required()

const DatiCassaPrevidenzialeSchema = Joi.alternatives().try(
  Joi.array().items(DatiCassaPrevidenzialeItemSchema),
  DatiCassaPrevidenzialeItemSchema)

const ScontoMaggiorazioneItemSchema = Joi.object().keys({
  Tipo: Joi.valid('SC', 'MG').required(),
  Percentuale: Joi.number(),
  Importo: Joi.number()
}).required()

const ScontoMaggiorazioneSchema = Joi.alternatives().try(
  Joi.array().items(ScontoMaggiorazioneItemSchema),
  ScontoMaggiorazioneItemSchema)

const ImportoTotaleDocumentoSchema = Joi.number().positive()

const ArrotondamentoSchema = Joi.number()

const CausaleItemSchema = Joi.string().min(1).max(200)

const CausaleSchema = Joi.alternatives().try(
  Joi.array().items(CausaleItemSchema),
  CausaleItemSchema)

const Art73Schema = Joi.valid('SI')

const DatiGeneraliDocumentoSchema = Joi.object().keys({
  TipoDocumento: Joi.valid(TipiDocumentiValidi).required(), // 2.1.1.1
  Divisa: Joi.string().length(3).required(), // 2.1.1.2
  Data: Joi.string().isoDate().raw().required(), // 2.1.1.3
  Numero: Joi.string().max(20).required(), // 2.1.1.4
  DatiRitenuta: DatiRitenutaSchema, // 2.1.1.5
  DatiBollo: DatiBolloSchema, // 2.1.1.6
  DatiCassaPrevidenziale: DatiCassaPrevidenzialeSchema, // 2.1.1.7
  ScontoMaggiorazione: ScontoMaggiorazioneSchema, // 2.1.1.8
  ImportoTotaleDocumento: ImportoTotaleDocumentoSchema, // 2.1.1.9
  Arrotondamento: ArrotondamentoSchema, // 2.1.1.10
  Causale: CausaleSchema, // 2.1.1.11
  Art73: Art73Schema // 2.1.1.12
})

const RiferimentoNumeroLineaSchema = Joi.alternatives().try(
  Joi.array().items(Joi.number()),
  Joi.number())

const DatiOrdineAcquistoItemSchema = Joi.object().keys({
  RiferimentoNumeroLinea: RiferimentoNumeroLineaSchema, // 2.1.2.1
  IdDocumento: Joi.string().min(1).max(20).required(), // 2.1.2.2
  Data: Joi.string().isoDate().raw(), // 2.1.2.3
  NumItem: Joi.string().min(1).max(20), // 2.1.2.4
  CodiceCommessaConvenzione: Joi.string().min(1).max(100), // 2.1.2.5
  CodiceCUP: Joi.string().min(1).max(15), // 2.1.2.6
  CodiceCIG: Joi.string().min(1).max(15) // 2.1.2.7
}).required()

const DatiOrdineAcquistoSchema = Joi.alternatives().try(
  Joi.array().items(DatiOrdineAcquistoItemSchema),
  DatiOrdineAcquistoItemSchema)

const DatiSALItemSchema = Joi.object().keys({
  RiferimentoFase: Joi.string().min(1).max(3).required() // 2.1.7.1
}).required()

const DatiSALSchema = Joi.alternatives().try(
  Joi.array().items(DatiSALItemSchema),
  DatiSALItemSchema)

const DatiDDTItemSchema = Joi.object().keys({
  NumeroDDT: Joi.string().min(1).max(20).required(), // 2.1.8.1
  DataDDT: Joi.string().isoDate().raw().required(), // 2.1.8.2
  RiferimentoNumeroLinea: RiferimentoNumeroLineaSchema // 2.1.8.3
}).required()

const DatiDDTSchema = Joi.alternatives().try(
  Joi.array().items(DatiDDTItemSchema),
  DatiDDTItemSchema)

const DatiAnagraficiVettoreSchema = Joi.object().keys({
  IdFiscaleIVA: IdFiscaleIVASchema.required(), // 2.1.9.1.1
  CodiceFiscale: CodiceFiscaleSchema, // 2.1.9.1.2
  Anagrafica: Joi.object().keys({
    Denominazione: Joi.string().alphanum().min(1).max(80),
    Nome: Joi.string().alphanum().min(1).max(60),
    Cognome: Joi.string().alphanum().min(1).max(60),
    Titolo: Joi.string().min(2).max(10),
    CodEORI: Joi.string().min(13).max(17)
  }).required(), // 2.1.9.1.3
  NumeroLicenzaGuida: Joi.string().min(1).max(20) // 2.1.9.1.4
})

const IndirizzoResaSchema = Joi.object().keys({
  Indirizzo: Joi.string().alphanum().min(1).max(60).required(),
  NumeroCivico: Joi.string().alphanum().min(1).max(8),
  CAP: Joi.string().regex(/^\d{5}$/).required(),
  Comune: Joi.string().min(1).max(60).required(),
  Provincia: Joi.string().uppercase().length(2),
  Nazione: Joi.string().uppercase().length(2).required()
})

const DatiTrasportoSchema = Joi.object().keys({
  DatiAnagraficiVettore: DatiAnagraficiVettoreSchema, // 2.1.9.1
  MezzoTrasporto: Joi.string().min(1).max(80), // 2.1.9.2
  CausaleTrasporto: Joi.string().min(1).max(100), // 2.1.9.3
  NumeroColli: Joi.number().integer().min(1).max(9999), // 2.1.9.4
  Descrizione: Joi.string().min(1).max(100), // 2.1.9.5
  UnitaMisuraPeso: Joi.string().min(1).max(10), // 2.1.9.6
  PesoLordo: Joi.number().min(0), // 2.1.9.7
  PesoNetto: Joi.number().min(0), // 2.1.9.8
  DataOraRitiro: Joi.string().isoDate().raw().length(19), // 2.1.9.9
  DataInizioTrasporto: Joi.string().isoDate().raw().length(10), // 2.1.9.10
  TipoResa: Joi.string().length(3), // 2.1.9.11
  IndirizzoResa: IndirizzoResaSchema, // 2.1.9.12
  DataOraConsegna: Joi.string().isoDate().raw().length(19) // 2.1.9.13
})

const DatiGeneraliSchema = Joi.object().keys({
  DatiGeneraliDocumento: DatiGeneraliDocumentoSchema.required(), // 2.1.1
  DatiOrdineAcquisto: DatiOrdineAcquistoSchema, // 2.1.2
  DatiContratto: DatiOrdineAcquistoSchema, // 2.1.3
  DatiConvenzione: DatiOrdineAcquistoSchema, // 2.1.4
  DatiRicezione: DatiOrdineAcquistoSchema, // 2.1.5
  DatiFattureCollegate: DatiOrdineAcquistoSchema, // 2.1.6
  DatiSAL: DatiSALSchema, // 2.1.7
  DatiDDT: DatiDDTSchema, // 2.1.8
  DatiTrasporto: DatiTrasportoSchema // 2.1.9
}).required()

const FatturaElettronicaBodyItemSchema = Joi.object().keys({
  DatiGenerali: DatiGeneraliSchema // 2.1
}).required()

const FatturaElettronicaBodySchema = Joi.alternatives().try(
  Joi.array().items(FatturaElettronicaBodyItemSchema),
  FatturaElettronicaBodyItemSchema)

module.exports = FatturaElettronicaBodySchema.required()
