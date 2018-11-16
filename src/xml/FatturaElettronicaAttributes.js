'use strict'

const generateAttributes = FormatoTrasmissione => ({
  'xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
  'xmlns:p': 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'versione': FormatoTrasmissione,
  'xsi:schemaLocation': 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2 http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_versione_1.2.xsd'
})
module.exports = invoice => {
  const {
    FatturaElettronicaHeader: {
      DatiTrasmissione: {
        FormatoTrasmissione
      }
    }
  } = invoice

  switch (FormatoTrasmissione) {
    case 'FPA12':
      return generateAttributes(FormatoTrasmissione)
    case 'FPR12':
      return generateAttributes(FormatoTrasmissione)
    default:
      throw new Error('FormatoTrasmissione sconosciuto')
  }
}
