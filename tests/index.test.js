'use strict'

const json2fatturapaxml = require('../index')

describe('json2fatturapaxml', () => {
  test('should generate xml for FPA12', () => {
    const invoice = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: '03469550986'
          },
          ProgressivoInvio: '001',
          FormatoTrasmissione: 'FPA12',
          CodiceDestinatario: '000000'
        },
        CedentePrestatore: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: '03469550986'
            },
            Anagrafica: {
              Nome: 'dfa',
              RegimeFiscale: 'RF19'
            }
          }
        }
      }
    }
    const expected = ''
    const result = json2fatturapaxml(invoice)
    expect(result).toEqual(expected)
  })
})
