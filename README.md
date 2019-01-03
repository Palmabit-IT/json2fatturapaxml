# JSON 2 FatturaPa XML

Generazione di una fattura in formato xml compatibile con le specifiche di fatturapa.gov.it

## Getting Started

### Installing

```bash
npm install --save json2fatturapaxml
```

### Usage

```javascript
const json2fatturapaxml = require('json2fatturapaxml')
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

    const result = json2fatturapaxml(invoice)

    if (!result.error) { // Check error
      console.log('xml', result)
    }
```

### Error

Il JSON in ingresso viene validato secondo questo [formato fattura].

## Running the tests

```bash
npm test
```

## Built With

* [xml-js](https://github.com/nashwaan/xml-js#readme) - A convertor between XML text and Javascript object / JSON text

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Palmabit** - *Initial work* - [Palmabit](https://github.com/Palmabit-IT)

See also the list of [contributors](https://github.com/Palmabit-IT/json2fatturapaxml/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[formato fattura]: https://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2.1/Rappresentazione_tabellare_del_tracciato_FatturaPA_versione_1.2.1.pdf