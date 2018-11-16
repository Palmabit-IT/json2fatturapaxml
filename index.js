'use strict'

const convert = require('xml-js')
const validate = require('./src/validate')
const _declaration = require('./src/xml/declaration')
const FatturaElettronicaAttributes = require('./src/xml/FatturaElettronicaAttributes')

const options = {
  compact: true,
  spaces: 2
}

module.exports = (invoice = {}) => {
  const result = validate(invoice)
  if (result.error) return result.error
  const json = {
    _declaration,
    'p:FatturaElettronica': {
      '_attributes': FatturaElettronicaAttributes(invoice),
      ...invoice
    }
  }

  return convert.json2xml(json, options)
}
