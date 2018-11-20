'use strict'

const json2fatturapaxml = require('../index')
const fs = require('fs')

describe('json2fatturapaxml', () => {
  test('should generate minimal xml for FPR12', () => {
    const invoice = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: '03469550986'
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
              IdCodice: '03469550986'
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
              IdCodice: '03469550986'
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
    const expected = fs.readFileSync('tests/xml/IT03469550986_FPR001.xml', { encoding: 'UTF-8' })
    const result = json2fatturapaxml(invoice)
    expect(result.error).toBeUndefined()
    expect(result).toEqual(expected)
  })

  test('should generate minimal xml for FPR12', () => {
    const invoice = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: '03469550986'
          },
          ProgressivoInvio: '001',
          FormatoTrasmissione: 'FPA12',
          CodiceDestinatario: 'GIQELA'
        },
        CedentePrestatore: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: '03469550986'
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
              IdCodice: '03469550986'
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
    const expected = fs.readFileSync('tests/xml/IT03469550986_PA001.xml', { encoding: 'UTF-8' })
    const result = json2fatturapaxml(invoice)
    expect(result.error).toBeUndefined()
    expect(result).toEqual(expected)
  })
})
