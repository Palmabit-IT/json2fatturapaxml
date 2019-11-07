'use strict'

const BaseJoi = require('joi-currency-code')(require('joi'))
const JoiCountryExtension = require('joi-country-extension')
const Joi = BaseJoi.extend(JoiCountryExtension)

const TipiDocumentiValidi = [
  'TD01',
  'TD02',
  'TD02',
  'TD03',
  'TD04',
  'TD05',
  'TD06'
]
const TipiRitenuteValide = ['RT01', 'RT02']
const TipiCassaValidi = [
  'TC01',
  'TC02',
  'TC03',
  'TC04',
  'TC05',
  'TC06',
  'TC07',
  'TC08',
  'TC09',
  'TC10',
  'TC11',
  'TC12',
  'TC13',
  'TC14',
  'TC15',
  'TC16',
  'TC17',
  'TC18',
  'TC19',
  'TC20',
  'TC21',
  'TC22'
]
const NaturaValidi = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7']
const ModalitaPagamentoValidi = [
  'MP01',
  'MP02',
  'MP03',
  'MP04',
  'MP05',
  'MP06',
  'MP07',
  'MP08',
  'MP09',
  'MP10',
  'MP11',
  'MP12',
  'MP13',
  'MP14',
  'MP15',
  'MP16',
  'MP17',
  'MP18',
  'MP19',
  'MP20',
  'MP21',
  'MP22'
]

const IdPaeseSchema = Joi.string().country()
const IdCodiceSchema = Joi.string()
  .alphanum()
  .min(2)
  .max(28)
const IdFiscaleIVASchema = Joi.object().keys({
  IdPaese: IdPaeseSchema.required(),
  IdCodice: IdCodiceSchema.required()
})
const CodiceFiscaleSchema = Joi.string()
  .alphanum()
  .min(11)
  .max(16)
const PrezzoSchema = Joi.string().regex(/^[-]?\d{1,13}(\.\d{2,6})$/)
const AliquotaIVASchema = Joi.string().regex(/^\d{1,3}(\.\d{2,2})$/)

const DatiRitenutaSchema = Joi.object().keys({
  TipoRitenuta: Joi.valid(TipiRitenuteValide).required(),
  ImportoRitenuta: Joi.string()
    .regex(/^[-]?\d{1,12}(\.\d{2,6})$/)
    .required(), // min 4 max 15
  AliquotaRitenuta: Joi.string()
    .regex(/^[-]?\d{1,3}(\.\d{2,2})$/)
    .required(),
  CausalePagamento: Joi.string()
    .min(1)
    .max(2)
    .required()
})

const DatiBolloSchema = Joi.object().keys({
  BolloVirtuale: Joi.valid('SI').required(),
  ImportoBollo: Joi.string()
    .regex(/^[-]?\d{1,12}(\.\d{2,6})$/)
    .required()
})

const DatiCassaPrevidenzialeItemSchema = Joi.object()
  .keys({
    TipoCassa: Joi.valid(TipiCassaValidi).required(),
    AlCassa: Joi.string()
      .regex(/^\d{1,3}(\.\d{2,2})$/)
      .required(),
    ImportoContributoCassa: Joi.string()
      .regex(/^[-]?\d{1,12}(\.\d{2,6})$/)
      .required(),
    ImponibileCassa: Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/),
    AliquotaIVA: AliquotaIVASchema.required(),
    Ritenuta: Joi.valid('SI'),
    Natura: Joi.valid(NaturaValidi),
    RiferimentoAmministrazione: Joi.string()
      .min(1)
      .max(20)
  })
  .required()

const DatiCassaPrevidenzialeSchema = Joi.alternatives().try(
  Joi.array().items(DatiCassaPrevidenzialeItemSchema),
  DatiCassaPrevidenzialeItemSchema
)

const ScontoMaggiorazioneItemSchema = Joi.object()
  .keys({
    Tipo: Joi.valid('SC', 'MG').required(),
    Percentuale: Joi.string().regex(/^\d{1,3}(\.\d{2,2})$/),
    Importo: Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/)
  })
  .required()

const ScontoMaggiorazioneSchema = Joi.alternatives().try(
  Joi.array().items(ScontoMaggiorazioneItemSchema),
  ScontoMaggiorazioneItemSchema
)

const ImportoTotaleDocumentoSchema = Joi.string().regex(
  /^[-]?\d{1,12}(\.\d{2,6})$/
)

const ArrotondamentoSchema = Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/)

const CausaleItemSchema = Joi.string()
  .min(1)
  .max(200)

const CausaleSchema = Joi.alternatives().try(
  Joi.array().items(CausaleItemSchema),
  CausaleItemSchema
)

const Art73Schema = Joi.valid('SI')

const DatiGeneraliDocumentoSchema = Joi.object().keys({
  TipoDocumento: Joi.valid(TipiDocumentiValidi).required(), // 2.1.1.1
  Divisa: Joi.string()
    .currency()
    .required(), // 2.1.1.2
  Data: Joi.string()
    .isoDate()
    .raw()
    .required(), // 2.1.1.3
  Numero: Joi.string()
    .max(20)
    .required(), // 2.1.1.4
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
  Joi.array().items(
    Joi.number()
      .min(1)
      .max(9999)
  ),
  Joi.number()
    .min(1)
    .max(9999)
)

const DatiOrdineAcquistoItemSchema = Joi.object()
  .keys({
    RiferimentoNumeroLinea: RiferimentoNumeroLineaSchema, // 2.1.2.1
    IdDocumento: Joi.string()
      .min(1)
      .max(20)
      .required(), // 2.1.2.2
    Data: Joi.string()
      .isoDate()
      .raw(), // 2.1.2.3
    NumItem: Joi.string()
      .min(1)
      .max(20), // 2.1.2.4
    CodiceCommessaConvenzione: Joi.string()
      .min(1)
      .max(100), // 2.1.2.5
    CodiceCUP: Joi.string()
      .min(1)
      .max(15), // 2.1.2.6
    CodiceCIG: Joi.string()
      .min(1)
      .max(15) // 2.1.2.7
  })
  .required()

const DatiOrdineAcquistoSchema = Joi.alternatives().try(
  Joi.array().items(DatiOrdineAcquistoItemSchema),
  DatiOrdineAcquistoItemSchema
)

const DatiSALItemSchema = Joi.object()
  .keys({
    RiferimentoFase: Joi.number()
      .min(1)
      .max(999)
      .required() // 2.1.7.1
  })
  .required()

const DatiSALSchema = Joi.alternatives().try(
  Joi.array().items(DatiSALItemSchema),
  DatiSALItemSchema
)

const DatiDDTItemSchema = Joi.object()
  .keys({
    NumeroDDT: Joi.string()
      .min(1)
      .max(20)
      .required(), // 2.1.8.1
    DataDDT: Joi.string()
      .isoDate()
      .raw()
      .required(), // 2.1.8.2
    RiferimentoNumeroLinea: RiferimentoNumeroLineaSchema // 2.1.8.3
  })
  .required()

const DatiDDTSchema = Joi.alternatives().try(
  Joi.array().items(DatiDDTItemSchema),
  DatiDDTItemSchema
)

const DatiAnagraficiVettoreSchema = Joi.object().keys({
  IdFiscaleIVA: IdFiscaleIVASchema.required(), // 2.1.9.1.1
  CodiceFiscale: CodiceFiscaleSchema, // 2.1.9.1.2
  Anagrafica: Joi.object()
    .keys({
      Denominazione: Joi.string()
        .alphanum()
        .min(1)
        .max(80),
      Nome: Joi.string()
        .alphanum()
        .min(1)
        .max(60),
      Cognome: Joi.string()
        .alphanum()
        .min(1)
        .max(60),
      Titolo: Joi.string()
        .min(2)
        .max(10),
      CodEORI: Joi.string()
        .min(13)
        .max(17)
    })
    .required(), // 2.1.9.1.3
  NumeroLicenzaGuida: Joi.string()
    .min(1)
    .max(20) // 2.1.9.1.4
})

const IndirizzoResaSchema = Joi.object().keys({
  Indirizzo: Joi.string()
    .alphanum()
    .min(1)
    .max(60)
    .required(),
  NumeroCivico: Joi.string()
    .alphanum()
    .min(1)
    .max(8),
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

const DatiTrasportoSchema = Joi.object().keys({
  DatiAnagraficiVettore: DatiAnagraficiVettoreSchema, // 2.1.9.1
  MezzoTrasporto: Joi.string()
    .min(1)
    .max(80), // 2.1.9.2
  CausaleTrasporto: Joi.string()
    .min(1)
    .max(100), // 2.1.9.3
  NumeroColli: Joi.number()
    .integer()
    .min(1)
    .max(9999), // 2.1.9.4
  Descrizione: Joi.string()
    .min(1)
    .max(100), // 2.1.9.5
  UnitaMisuraPeso: Joi.string()
    .min(1)
    .max(10), // 2.1.9.6
  PesoLordo: Joi.string().regex(/^\d{1,4}(\.\d{2,2})$/), // 2.1.9.7
  PesoNetto: Joi.string().regex(/^\d{1,4}(\.\d{2,2})$/), // 2.1.9.8
  DataOraRitiro: Joi.string()
    .isoDate()
    .raw(), // 2.1.9.9
  DataInizioTrasporto: Joi.string()
    .isoDate()
    .raw(), // 2.1.9.10
  TipoResa: Joi.string().length(3), // 2.1.9.11
  IndirizzoResa: IndirizzoResaSchema, // 2.1.9.12
  DataOraConsegna: Joi.string()
    .isoDate()
    .raw() // 2.1.9.13
})

const FatturaPrincipaleSchema = Joi.object().keys({
  NumeroFatturaPrincipale: Joi.string()
    .min(1)
    .max(20)
    .required(), // 2.1.10.1
  DataFatturaPrincipale: Joi.string()
    .isoDate()
    .raw() // 2.1.10.2
})

const DatiGeneraliSchema = Joi.object()
  .keys({
    DatiGeneraliDocumento: DatiGeneraliDocumentoSchema.required(), // 2.1.1
    DatiOrdineAcquisto: DatiOrdineAcquistoSchema, // 2.1.2
    DatiContratto: DatiOrdineAcquistoSchema, // 2.1.3
    DatiConvenzione: DatiOrdineAcquistoSchema, // 2.1.4
    DatiRicezione: DatiOrdineAcquistoSchema, // 2.1.5
    DatiFattureCollegate: DatiOrdineAcquistoSchema, // 2.1.6
    DatiSAL: DatiSALSchema, // 2.1.7
    DatiDDT: DatiDDTSchema, // 2.1.8
    DatiTrasporto: DatiTrasportoSchema, // 2.1.9
    FatturaPrincipale: FatturaPrincipaleSchema // 2.1.10
  })
  .required()

const CodiceArticoloItemSchema = Joi.object().keys({
  CodiceTipo: Joi.string()
    .min(1)
    .max(35)
    .required(), // 2.2.1.3.1
  CodiceValore: Joi.string()
    .min(1)
    .max(35)
    .required() // 2.2.1.3.2
})

const CodiceArticoloSchema = Joi.alternatives().try(
  Joi.array().items(CodiceArticoloItemSchema),
  CodiceArticoloItemSchema
)

const AltriDatiGestionaliItemSchema = Joi.object().keys({
  TipoDato: Joi.string()
    .min(1)
    .max(10)
    .required(), // 2.2.1.16.1
  RiferimentoTesto: Joi.string()
    .min(1)
    .max(60), // 2.2.1.16.2
  RiferimentoNumero: Joi.string().regex(/^\d{1,18}(\.\d{2,2})$/), // 2.2.1.16.3
  RiferimentoData: Joi.string()
    .isoDate()
    .raw() // 2.2.1.16.4
})

const AltriDatiGestionaliSchema = Joi.alternatives().try(
  Joi.array().items(AltriDatiGestionaliItemSchema),
  AltriDatiGestionaliItemSchema
)

const DettaglioLineeItemSchema = Joi.object()
  .keys({
    NumeroLinea: Joi.number()
      .min(0)
      .max(9999)
      .required(), // 2.2.1.1
    TipoCessionePrestazione: Joi.valid('SC', 'PR', 'AB', 'AC'), // 2.2.1.2
    CodiceArticolo: CodiceArticoloSchema, // 2.2.1.3
    Descrizione: Joi.string()
      .min(1)
      .max(1000)
      .required(), // 2.2.1.4
    Quantita: Joi.string().regex(/^\d{1,13}(\.\d{2,6})$/), // 2.2.1.5
    UnitaMisura: Joi.string()
      .min(1)
      .max(10), // 2.2.1.6
    DataInizioPeriodo: Joi.string()
      .isoDate()
      .raw(), // 2.2.1.7
    DataFinePeriodo: Joi.string()
      .isoDate()
      .raw(), // 2.2.1.8
    PrezzoUnitario: PrezzoSchema.required(), // 2.2.1.9
    ScontoMaggiorazione: ScontoMaggiorazioneSchema, // 2.2.1.10
    PrezzoTotale: PrezzoSchema.required(), // 2.2.1.11
    AliquotaIVA: AliquotaIVASchema.required(), // 2.2.1.12
    Ritenuta: Joi.valid('SI'), // 2.2.1.13
    Natura: Joi.valid(NaturaValidi), // 2.2.1.14
    RiferimentoAmministrazione: Joi.string()
      .min(1)
      .max(20), // 2.2.1.15
    AltriDatiGestionali: AltriDatiGestionaliSchema // 2.2.1.16
  })
  .required()

const DettaglioLineeSchema = Joi.alternatives().try(
  Joi.array().items(DettaglioLineeItemSchema),
  DettaglioLineeItemSchema
)

const DatiRiepilogoItemSchema = Joi.object().keys({
  AliquotaIVA: AliquotaIVASchema.required(), // 2.2.2.1
  Natura: Joi.valid(NaturaValidi), // 2.2.2.2
  SpeseAccessorie: Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/), // 2.2.2.3
  Arrotondamento: Joi.string().regex(/^[-]?\d{1,13}(\.\d{2,6})$/), // 2.2.2.4
  ImponibileImporto: PrezzoSchema.required(), // 2.2.2.5
  Imposta: PrezzoSchema.required(), // 2.2.2.6
  EsigibilitaIVA: Joi.valid('I', 'D', 'S'), // 2.2.2.7
  RiferimentoNormativo: Joi.string()
    .min(1)
    .max(100) // 2.2.2.8
})

const DatiRiepilogoSchema = Joi.alternatives().try(
  Joi.array().items(DatiRiepilogoItemSchema),
  DatiRiepilogoItemSchema
)

const DatiBeniServiziSchema = Joi.object().keys({
  DettaglioLinee: DettaglioLineeSchema.required(), // 2.2.1
  DatiRiepilogo: DatiRiepilogoSchema.required() // 2.2.2
})

const DatiVeicoliSchema = Joi.object().keys({
  Data: Joi.string()
    .isoDate()
    .raw()
    .required(), // 2.3.1
  TotalePercorso: Joi.string()
    .min(1)
    .max(15)
    .required() // 2.3.2
})

const DettaglioPagamentoItemSchema = Joi.object()
  .keys({
    Beneficiario: Joi.string()
      .min(1)
      .max(200), // 2.4.2.1
    ModalitaPagamento: Joi.valid(ModalitaPagamentoValidi).required(), // 2.4.2.2
    DataRiferimentoTerminiPagamento: Joi.string()
      .isoDate()
      .raw(), // 2.4.2.3
    GiorniTerminiPagamento: Joi.number()
      .integer()
      .min(0)
      .max(999), // 2.4.2.4 // 2.4.2.4
    DataScadenzaPagamento: Joi.string()
      .isoDate()
      .raw(), // 2.4.2.5
    ImportoPagamento: Joi.string()
      .regex(/^[-]?\d{1,12}(\.\d{2,6})$/)
      .required(), // 2.4.2.6
    CodUfficioPostale: Joi.string()
      .min(1)
      .max(20), // 2.4.2.7
    CognomeQuietanzante: Joi.string()
      .min(1)
      .max(60), // 2.4.2.8
    NomeQuietanzante: Joi.string()
      .min(1)
      .max(60), // 2.4.2.9
    CFQuietanzante: Joi.string().length(16), // 2.4.2.10
    TitoloQuietanzante: Joi.string()
      .min(2)
      .max(10), // 2.4.2.11
    IstitutoFinanziario: Joi.string()
      .min(1)
      .max(80), // 2.4.2.12
    IBAN: Joi.string()
      .min(15)
      .max(34), // 2.4.2.13
    ABI: Joi.string().length(5), // 2.4.2.14
    CAB: Joi.string().length(5), // 2.4.2.15
    BIC: Joi.string()
      .min(8)
      .max(11), // 2.4.2.16
    ScontoPagamentoAnticipato: Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/), // 2.4.2.17
    DataLimitePagamentoAnticipato: Joi.string()
      .isoDate()
      .raw(), // 2.4.2.18
    PenalitaPagamentiRitardati: Joi.string().regex(/^[-]?\d{1,12}(\.\d{2,6})$/), // 2.4.2.19
    DataDecorrenzaPenale: Joi.string()
      .isoDate()
      .raw(), // 2.4.2.20
    CodicePagamento: Joi.string()
      .min(1)
      .max(60) // 2.4.2.21
  })
  .required()

const DettaglioPagamentoSchema = Joi.alternatives().try(
  Joi.array().items(DettaglioPagamentoItemSchema),
  DettaglioPagamentoItemSchema
)

const DatiPagamentoItemSchema = Joi.object()
  .keys({
    CondizioniPagamento: Joi.valid('TP01', 'TP02', 'TP03').required(), // 2.4.1
    DettaglioPagamento: DettaglioPagamentoSchema.required() // 2.4.2
  })
  .required()

const DatiPagamentoSchema = Joi.alternatives().try(
  Joi.array().items(DatiPagamentoItemSchema),
  DatiPagamentoItemSchema
)

const AllegatiItemSchema = Joi.object()
  .keys({
    NomeAttachment: Joi.string()
      .min(1)
      .max(60)
      .required(), // 2.5.1
    AlgoritmoCompressione: Joi.string()
      .min(1)
      .max(10), // 2.5.2
    FormatoAttachment: Joi.string()
      .min(1)
      .max(10), // 2.5.3
    DescrizioneAttachment: Joi.string()
      .min(1)
      .max(100), // 2.5.4
    Attachment: Joi.string().required() // 2.5.5
  })
  .required()

const AllegatiSchema = Joi.alternatives().try(
  Joi.array().items(AllegatiItemSchema),
  AllegatiItemSchema
)

const FatturaElettronicaBodyItemSchema = Joi.object()
  .keys({
    DatiGenerali: DatiGeneraliSchema, // 2.1
    DatiBeniServizi: DatiBeniServiziSchema.required(), // 2.2
    DatiVeicoli: DatiVeicoliSchema, // 2.3
    DatiPagamento: DatiPagamentoSchema, // 2.4
    Allegati: AllegatiSchema // 2.5
  })
  .required()

const FatturaElettronicaBodySchema = Joi.alternatives().try(
  Joi.array().items(FatturaElettronicaBodyItemSchema),
  FatturaElettronicaBodyItemSchema
)

module.exports = FatturaElettronicaBodySchema.required()
