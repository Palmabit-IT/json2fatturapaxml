'use strict'

const convert = require('xml-js')
const validate = require('./src/validate')
const _declaration = require('./src/xml/declaration')
const FatturaElettronicaAttributes = require('./src/xml/FatturaElettronicaAttributes')
const { sanitizeObject } = require('./src/xml/sanitize')

const options = {
  compact: true,
  spaces: 2
}

module.exports = (invoice = {}, opt = {}) => {
  const { returnXmlWithErrors = false } = opt;
  const result = validate(invoice)
  if (result.error && !returnXmlWithErrors) return result

  const sanitizedInvoice = sanitizeObject(invoice)

  const json = {
    _declaration,
    'p:FatturaElettronica': {
      '_attributes': FatturaElettronicaAttributes(invoice),
      ...sanitizedInvoice
    }
  }
	
  return (!returnXmlWithErrors) ? convert.json2xml(json, options) : { error: result.error, xml: convert.json2xml(json, options) }
}
