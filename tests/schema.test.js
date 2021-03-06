'use strict'

const Joi = require('joi')
const schema = require('../src/schemas/FatturaElettronicaSchema')
const schemaHeader = require('../src/schemas/FatturaElettronicaHeaderSchema')

describe.only('Schema', () => {
  describe('FatturaElettronicaHeader', () => {
    test('should require FatturaElettronicaHeader', () => {
      const value = {}
      const result = Joi.validate(value, schema)
      const { error: { details = [] } = {} } = result || {}
      expect(
        details.some(
          e => e.message === '"FatturaElettronicaHeader" is required'
        )
      ).toBeTruthy()
    })

    describe('DatiTrasmissione', () => {
      test('should require DatiTrasmissione', () => {
        const value = {
          FatturaElettronicaHeader: {}
        }
        const result = Joi.validate(value, schema)
        const { error: { details = [] } = {} } = result || {}
        expect(
          details.some(e => e.message === '"DatiTrasmissione" is required')
        ).toBeTruthy()
      })

      describe('IdTrasmittente', () => {
        test('should require IdTrasmittente', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {}
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          expect(
            details.some(e => e.message === '"IdTrasmittente" is required')
          ).toBeTruthy()
        })

        test('should require IdPaese', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {}
              }
            }
          }
          const result = Joi.validate(value, schema, { abortEarly: false })
          const { error: { details = [] } = {} } = result || {}
          // console.log('details', details)
          expect(
            details.some(e => e.message === '"IdPaese" is required')
          ).toBeTruthy()
        })

        test('IdPaese should be a string', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 1
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          expect(
            details.some(e => e.message === '"IdPaese" must be a string')
          ).toBeTruthy()
        })

        test('"IdPaese" needs to be a valid ISO 3166-1 alpha-2 country code', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 'ITT'
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          expect(
            details.some(
              e =>
                e.message ===
                '"IdPaese" needs to be a valid ISO 3166-1 alpha-2 country code'
            )
          ).toBeTruthy()
        })

        test('should require idCodice', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 'IT'
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          expect(
            details.some(e => e.message === '"IdCodice" is required')
          ).toBeTruthy()
        })

        test('IdCodice should be a string', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 'IT',
                  IdCodice: 1
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          expect(
            details.some(e => e.message === '"IdCodice" must be a string')
          ).toBeTruthy()
        })

        test('"IdCodice" length must be 2 characters long', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 'IT',
                  IdCodice: 'abcdefghilmnoprstuvzabcdefghi8'
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const { error: { details = [] } = {} } = result || {}
          const expectedMessage =
            '"IdCodice" length must be less than or equal to 28 characters long'
          expect(details.some(e => e.message === expectedMessage)).toBeTruthy()
        })

        test("'Provincia' not required when Nazione is not 'IT'", () => {
          const invoice = {
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
                Nazione: 'RU'
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
                Nazione: 'RU'
              }
            }
          }

          const result = Joi.validate(invoice, schemaHeader)

          expect(result.error).toBeFalsy()
        })

        // test("'Provincia' required when Nazione is 'IT'", () => {
        //   const invoice = {
        //     DatiTrasmissione: {
        //       IdTrasmittente: {
        //         IdPaese: 'IT',
        //         IdCodice: '03469550986'
        //       },
        //       ProgressivoInvio: '001',
        //       FormatoTrasmissione: 'FPR12',
        //       CodiceDestinatario: '0000000',
        //       PECDestinatario: 'palmabit@pec.it'
        //     },
        //     CedentePrestatore: {
        //       DatiAnagrafici: {
        //         IdFiscaleIVA: {
        //           IdPaese: 'IT',
        //           IdCodice: '03469550986'
        //         },
        //         Anagrafica: {
        //           Denominazione: 'dfa'
        //         },
        //         RegimeFiscale: 'RF19'
        //       },
        //       Sede: {
        //         Indirizzo: 'Indirizzo',
        //         CAP: '00000',
        //         Comune: 'Comune',
        //         Nazione: 'IT'
        //       }
        //     },
        //     CessionarioCommittente: {
        //       DatiAnagrafici: {
        //         IdFiscaleIVA: {
        //           IdPaese: 'IT',
        //           IdCodice: '03469550986'
        //         },
        //         Anagrafica: {
        //           Denominazione: 'Denominazione'
        //         }
        //       },
        //       Sede: {
        //         Indirizzo: 'Indirizzo',
        //         CAP: '00000',
        //         Comune: 'Comune',
        //         Nazione: 'IT'
        //       }
        //     }
        //   }

        //   const result = Joi.validate(invoice, schemaHeader)

        //   expect(result.error).not.toBeNull()
        // })

        test("Should NOT fail when 'Nazione' is 'IT' AND 'Provincia' exists", () => {
          const invoice = {
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
                Provincia: 'MN',
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
                Provincia: 'MN',
                Nazione: 'IT'
              }
            }
          }

          const result = Joi.validate(invoice, schemaHeader)

          console.log(result.error)

          expect(result.error).toBeNull()
        })
      })
      /*
      describe('PECDestinatario is required when CodiceDestinatario == 0000000', () => {
        const value = {
          FatturaElettronicaHeader: {
            DatiTrasmissione: {
              IdTrasmittente: {
                IdPaese: 'IT',
                IdCodice: 'IdCodice'
              },
              CodiceDestinatario: '0000000',
              ProgressivoInvio: '001',
              FormatoTrasmissione: 'FPR12'
            }
          }
        }
        const result = Joi.validate(value, schema)
        console.log('result', result)
      })
       */
    })
  })
})
