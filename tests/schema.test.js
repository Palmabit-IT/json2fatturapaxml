'use strict'

const Joi = require('joi')
const schema = require('../src/schema')

describe('Schema', () => {
  describe('FatturaElettronicaHeader', () => {
    test('should require FatturaElettronicaHeader', () => {
      const value = {}
      const result = Joi.validate(value, schema)
      const {
        error: {
          details = []
        } = {}
      } = result || {}
      expect(details.some(e => e.message === '"FatturaElettronicaHeader" is required')).toBeTruthy()
    })

    describe('DatiTrasmissione', () => {
      test('should require DatiTrasmissione', () => {
        const value = {
          FatturaElettronicaHeader: {}
        }
        const result = Joi.validate(value, schema)
        const {
          error: {
            details = []
          } = {}
        } = result || {}
        expect(details.some(e => e.message === '"DatiTrasmissione" is required')).toBeTruthy()
      })

      describe('IdTrasmittente', () => {
        test('should require IdTrasmittente', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {}
            }
          }
          const result = Joi.validate(value, schema)
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdTrasmittente" is required')).toBeTruthy()
        })

        test('should require IdPaese', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {}
              }
            }
          }
          const result = Joi.validate(value, schema)
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdPaese" is required')).toBeTruthy()
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
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdPaese" must be a string')).toBeTruthy()
        })

        test('"IdPaese" length must be 2 characters long', () => {
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
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdPaese" length must be 2 characters long')).toBeTruthy()
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
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdCodice" is required')).toBeTruthy()
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
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          expect(details.some(e => e.message === '"IdCodice" must be a string')).toBeTruthy()
        })

        test('"IdCodice" length must be 2 characters long', () => {
          const value = {
            FatturaElettronicaHeader: {
              DatiTrasmissione: {
                IdTrasmittente: {
                  IdPaese: 'IT',
                  IdCodice: 'abcdefghilmnoprstuvzabcdefghi'
                }
              }
            }
          }
          const result = Joi.validate(value, schema)
          const {
            error: {
              details = []
            } = {}
          } = result || {}
          const expectedMessage = '"IdCodice" length must be less than or equal to 28 characters long'
          expect(details.some(e => e.message === expectedMessage)).toBeTruthy()
        })
      })
    })
  })
})