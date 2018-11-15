'use strict'

const convert = require('xml-js')

const json = {
  _declaration: {
    _attributes: {
      version: '1.0'
    }
  },
  'p:FatturaElettronica': {
    '_attributes': {
      'xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
      'xmlns:p': 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'versione': 'FPA12',
      'xsi:schemaLocation': 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2 http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_versione_1.2.xsd'
    }
  }
}

const options = {
  compact: true,
  spaces: 2
}
const result = convert.json2xml(json, options)
console.log(result)
