const joy_errors = require('../src/joi-error-translations/IT')
const json2xml = require('../src/validate')
const schema = require('../src/schemas/FatturaElettronicaSchema')

describe('Translation errors', () => {
  test('should return string.max error in italian', () => {
    const value = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
          },
          ProgressivoInvio: '001',
          FormatoTrasmissione: 'FPR12',
          CodiceDestinatario: '0000000',
          PECDestinatario: 'palmabit@pec.it'
        },
        CedentePrestatore: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
            },
            Anagrafica: {
              Denominazione: 'dfa'
            },
            RegimeFiscale: 'RF19'
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            CAP: '00000',
            Comune: 'Comune',
            Nazione: 'IT'
          }
        },
        CessionarioCommittente: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
            },
            Anagrafica: {
              Denominazione: 'Denominazione'
            }
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            CAP: '00000',
            Comune: 'Comune',
            Nazione: 'IT'
          }
        }
      },
      FatturaElettronicaBody: {
        DatiGenerali: {
          DatiGeneraliDocumento: {
            TipoDocumento: 'TD01',
            Divisa: 'EUR',
            Data: '2018-11-19',
            Numero: '1'
          }
        },
        DatiBeniServizi: {
          DettaglioLinee: {
            NumeroLinea: 1,
            Descrizione: 'Descrizione',
            PrezzoUnitario: '0.00',
            PrezzoTotale: '0.00',
            AliquotaIVA: '22.00'
          },
          DatiRiepilogo: {
            AliquotaIVA: '22.00',
            ImponibileImporto: '0.00',
            Imposta: '0.00'
          }
        }
      }
    }

    const result = json2xml(value, { language: 'IT' })

    const expectedMessage =
      '"IdCodice" la lunghezza della string non deve superare 28 caratteri.'
    expect(
      result.error.details.some(err => err.message === expectedMessage)
    ).toBeTruthy()
  })

  test('should return string.max error in english (default)', () => {
    const value = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
          },
          ProgressivoInvio: '001',
          FormatoTrasmissione: 'FPR12',
          CodiceDestinatario: '0000000',
          PECDestinatario: 'palmabit@pec.it'
        },
        CedentePrestatore: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
            },
            Anagrafica: {
              Denominazione: 'dfa'
            },
            RegimeFiscale: 'RF19'
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            CAP: '00000',
            Comune: 'Comune',
            Nazione: 'IT'
          }
        },
        CessionarioCommittente: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
            },
            Anagrafica: {
              Denominazione: 'Denominazione'
            }
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            CAP: '00000',
            Comune: 'Comune',
            Nazione: 'IT'
          }
        }
      },
      FatturaElettronicaBody: {
        DatiGenerali: {
          DatiGeneraliDocumento: {
            TipoDocumento: 'TD01',
            Divisa: 'EUR',
            Data: '2018-11-19',
            Numero: '1'
          }
        },
        DatiBeniServizi: {
          DettaglioLinee: {
            NumeroLinea: 1,
            Descrizione: 'Descrizione',
            PrezzoUnitario: '0.00',
            PrezzoTotale: '0.00',
            AliquotaIVA: '22.00'
          },
          DatiRiepilogo: {
            AliquotaIVA: '22.00',
            ImponibileImporto: '0.00',
            Imposta: '0.00'
          }
        }
      }
    }

    const result = json2xml(value)

    const expectedMessage =
      '"IdCodice" length must be less than or equal to 28 characters long'
    expect(
      result.error.details.some(err => err.message === expectedMessage)
    ).toBeTruthy()
  })
})
