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
    })
  })
})
