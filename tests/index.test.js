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
    const expected = fs.readFileSync('tests/xml/IT03469550986_PR001.xml', {
      encoding: 'UTF-8'
    })
    const result = json2fatturapaxml(invoice)
    expect(result.error).toBeUndefined()
    expect(result).toEqual(expected)
  })

  test('should generate minimal xml for FPA12', () => {
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
            Provincia: 'BS',
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
            Provincia: 'CR',
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
    const expected = fs.readFileSync('tests/xml/IT03469550986_PA001.xml', {
      encoding: 'UTF-8'
    })
    const result = json2fatturapaxml(invoice)
    expect(result.error).toBeUndefined()
    expect(result).toEqual(expected)
  })

  test('should generate a full xml', () => {
    const invoice = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: '03469550986'
          },
          ProgressivoInvio: '002',
          FormatoTrasmissione: 'FPR12',
          CodiceDestinatario: '0000000',
          ContattiTrasmittente: {
            Telefono: '12345',
            Email: 'hello@palmabit.com'
          },
          PECDestinatario: 'palmabit@pec.it'
        },
        CedentePrestatore: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: '03469550986'
            },
            CodiceFiscale: '03469550986',
            Anagrafica: {
              Denominazione: 'dfa',
              Nome: 'Giuseppe',
              Cognome: 'Aremare',
              Titolo: 'On',
              CodEORI: 'Codice 012345'
            },
            AlboProfessionale: 'AlboProfessionale',
            ProvinciaAlbo: 'BS',
            NumeroIscrizioneAlbo: 'NumeroIscrizioneAlbo',
            DataIscrizioneAlbo: '2018-11-20',
            RegimeFiscale: 'RF19'
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            NumeroCivico: '5b',
            CAP: '00000',
            Comune: 'Comune',
            Provincia: 'BS',
            Nazione: 'IT'
          },
          StabileOrganizzazione: {
            Indirizzo: 'Indirizzo',
            NumeroCivico: '5b',
            CAP: '00000',
            Comune: 'Comune',
            Provincia: 'BS',
            Nazione: 'IT'
          },
          IscrizioneREA: {
            Ufficio: 'BS',
            NumeroREA: '1',
            CapitaleSociale: '100.00',
            SocioUnico: 'SU',
            StatoLiquidazione: 'LS'
          },
          Contatti: {
            Telefono: '03030',
            Fax: '03030',
            Email: 'hello@palmabit.com'
          },
          RiferimentoAmministrazione: '1'
        },
        RappresentanteFiscale: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'cod'
            },
            CodiceFiscale: '03469550986',
            Anagrafica: {
              Denominazione: 'Denominazione',
              Nome: 'Nome',
              Cognome: 'Cognome',
              Titolo: 'Titolo',
              CodEORI: 'CodEORICodEORI'
            }
          }
        },
        CessionarioCommittente: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: '03469550986'
            },
            CodiceFiscale: 'CodiceFiscale',
            Anagrafica: {
              Denominazione: 'Denominazione',
              Nome: 'Nome',
              Cognome: 'Cognome',
              Titolo: 'Titolo',
              CodEORI: 'CodEORICodEORI'
            }
          },
          Sede: {
            Indirizzo: 'Indirizzo',
            NumeroCivico: '5',
            CAP: '00000',
            Comune: 'Comune',
            Provincia: 'BS',
            Nazione: 'IT'
          },
          StabileOrganizzazione: {
            Indirizzo: 'Indirizzo',
            NumeroCivico: '5',
            CAP: '00000',
            Comune: 'Comune',
            Provincia: 'BS',
            Nazione: 'IT'
          },
          RappresentanteFiscale: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'cod'
            },
            Denominazione: 'Denominazione',
            Nome: 'Nome',
            Cognome: 'Cognome'
          }
        },
        TerzoIntermediarioOSoggettoEmittente: {
          DatiAnagrafici: {
            IdFiscaleIVA: {
              IdPaese: 'IT',
              IdCodice: 'cod'
            },
            CodiceFiscale: 'CodiceFiscale',
            Anagrafica: {
              Denominazione: 'Denominazione',
              Nome: 'Nome',
              Cognome: 'Cognome',
              Titolo: 'Titolo',
              CodEORI: 'CodEORICodEORI'
            }
          }
        },
        SoggettoEmittente: 'TZ'
      },
      FatturaElettronicaBody: {
        DatiGenerali: {
          DatiGeneraliDocumento: {
            TipoDocumento: 'TD01',
            Divisa: 'EUR',
            Data: '2018-11-19',
            Numero: '1',
            DatiRitenuta: [{
              TipoRitenuta: 'RT01',
              ImportoRitenuta: '0.00',
              AliquotaRitenuta: '22.00',
              CausalePagamento: 'CP'
            }],
            DatiBollo: {
              BolloVirtuale: 'SI',
              ImportoBollo: '0.00'
            },
            DatiCassaPrevidenziale: {
              TipoCassa: 'TC01',
              AlCassa: '22.00',
              ImportoContributoCassa: '0.00',
              ImponibileCassa: '0.00',
              AliquotaIVA: '22.00',
              Ritenuta: 'SI',
              Natura: 'N1',
              RiferimentoAmministrazione: 'rif.'
            },
            ScontoMaggiorazione: {
              Tipo: 'SC',
              Percentuale: '0.00',
              Importo: '0.00'
            },
            ImportoTotaleDocumento: '0.00',
            Arrotondamento: '0.00',
            Causale: 'Causale1',
            Art73: 'SI'
          },
          DatiOrdineAcquisto: {
            RiferimentoNumeroLinea: 1,
            IdDocumento: 'id',
            Data: '2018-11-20',
            NumItem: 'NumItem',
            CodiceCommessaConvenzione: 'CodiceCommessaConvenzione',
            CodiceCUP: 'CodiceCUP',
            CodiceCIG: 'CodiceCIG'
          },
          DatiContratto: {
            RiferimentoNumeroLinea: 1,
            IdDocumento: 'id',
            Data: '2018-11-20',
            NumItem: 'NumItem',
            CodiceCommessaConvenzione: 'CodiceCommessaConvenzione',
            CodiceCUP: 'CodiceCUP',
            CodiceCIG: 'CodiceCIG'
          },
          DatiConvenzione: {
            RiferimentoNumeroLinea: 1,
            IdDocumento: 'id',
            Data: '2018-11-20',
            NumItem: 'NumItem',
            CodiceCommessaConvenzione: 'CodiceCommessaConvenzione',
            CodiceCUP: 'CodiceCUP',
            CodiceCIG: 'CodiceCIG'
          },
          DatiRicezione: {
            RiferimentoNumeroLinea: 1,
            IdDocumento: 'id',
            Data: '2018-11-20',
            NumItem: 'NumItem',
            CodiceCommessaConvenzione: 'CodiceCommessaConvenzione',
            CodiceCUP: 'CodiceCUP',
            CodiceCIG: 'CodiceCIG'
          },
          DatiFattureCollegate: {
            RiferimentoNumeroLinea: 1,
            IdDocumento: 'id',
            Data: '2018-11-20',
            NumItem: 'NumItem',
            CodiceCommessaConvenzione: 'CodiceCommessaConvenzione',
            CodiceCUP: 'CodiceCUP',
            CodiceCIG: 'CodiceCIG'
          },
          DatiSAL: {
            RiferimentoFase: 1
          },
          DatiDDT: {
            NumeroDDT: '1',
            DataDDT: '2018-11-20',
            RiferimentoNumeroLinea: 1
          },
          DatiTrasporto: {
            DatiAnagraficiVettore: {
              IdFiscaleIVA: {
                IdPaese: 'IT',
                IdCodice: 'IdCodice'
              },
              CodiceFiscale: 'CodiceFiscale',
              Anagrafica: {
                Denominazione: 'dfa',
                Nome: 'Giuseppe',
                Cognome: 'Aremare',
                Titolo: 'On',
                CodEORI: 'Codice 012345'
              },
              NumeroLicenzaGuida: 'NumeroLicenzaGuida'
            },
            MezzoTrasporto: 'MezzoTrasporto',
            CausaleTrasporto: 'CausaleTrasporto',
            NumeroColli: 2,
            Descrizione: 'Descrizione',
            UnitaMisuraPeso: 'KG',
            PesoLordo: '0.00',
            PesoNetto: '0.00',
            DataOraRitiro: '2018-11-20T15:19:00',
            DataInizioTrasporto: '2018-11-20T15:19:00',
            TipoResa: 'EXW',
            IndirizzoResa: {
              Indirizzo: 'Indirizzo',
              NumeroCivico: '5a',
              CAP: '00000',
              Comune: 'Brescia',
              Provincia: 'BS',
              Nazione: 'IT'
            },
            DataOraConsegna: '2018-11-20T15:19:00'
          },
          FatturaPrincipale: {
            NumeroFatturaPrincipale: 'dfa',
            DataFatturaPrincipale: '2018-11-20'
          }
        },
        DatiBeniServizi: {
          DettaglioLinee: {
            NumeroLinea: 1,
            TipoCessionePrestazione: 'SC',
            CodiceArticolo: {
              CodiceTipo: 'CodiceTipo',
              CodiceValore: 'CodiceValore'
            },
            Descrizione: 'Descrizione',
            Quantita: '1.00',
            UnitaMisura: 'kg',
            DataInizioPeriodo: '2018-11-20',
            DataFinePeriodo: '2018-11-20',
            PrezzoUnitario: '0.00',
            ScontoMaggiorazione: {
              Tipo: 'SC',
              Percentuale: '22.00',
              Importo: '0.00'
            },
            PrezzoTotale: '0.00',
            AliquotaIVA: '22.00',
            Ritenuta: 'SI',
            Natura: 'N1',
            RiferimentoAmministrazione: 'rif',
            AltriDatiGestionali: {
              TipoDato: 'TipoDato',
              RiferimentoTesto: 'RiferimentoTesto',
              RiferimentoNumero: '0.00',
              RiferimentoData: '2018-11-20'
            }
          },
          DatiRiepilogo: {
            AliquotaIVA: '22.00',
            Natura: 'N1',
            SpeseAccessorie: '0.00',
            Arrotondamento: '0.00',
            ImponibileImporto: '0.00',
            Imposta: '0.00',
            EsigibilitaIVA: 'I',
            RiferimentoNormativo: 'RiferimentoNormativo'
          }
        },
        DatiVeicoli: {
          Data: '2018-11-20',
          TotalePercorso: 'TotalePercorso'
        },
        DatiPagamento: {
          CondizioniPagamento: 'TP01',
          DettaglioPagamento: {
            Beneficiario: 'Beneficiario',
            ModalitaPagamento: 'MP01',
            DataRiferimentoTerminiPagamento: '2018-11-20',
            GiorniTerminiPagamento: 1,
            DataScadenzaPagamento: '2018-11-20',
            ImportoPagamento: '0.00',
            CodUfficioPostale: 'CodUfficioPostale',
            CognomeQuietanzante: 'CognomeQuietanzante',
            NomeQuietanzante: 'NomeQuietanzante',
            CFQuietanzante: 'CFQuietanzante__',
            TitoloQuietanzante: 'TitoloQuie',
            IstitutoFinanziario: 'IstitutoFinanziario',
            IBAN: 'IBANIBANIBANIBAN',
            ABI: 'ABI__',
            CAB: 'CAB__',
            BIC: 'BICBICBIC',
            ScontoPagamentoAnticipato: '0.00',
            DataLimitePagamentoAnticipato: '2018-11-20',
            PenalitaPagamentiRitardati: '0.00',
            DataDecorrenzaPenale: '2018-11-20',
            CodicePagamento: 'CodicePagamento'
          }
        },
        Allegati: {
          NomeAttachment: 'NomeAttachment',
          AlgoritmoCompressione: 'ZIP',
          FormatoAttachment: 'PDF',
          DescrizioneAttachment: 'DescrizioneAttachment',
          Attachment: 'BASE64Binary'
        }
      }
    }
    const result = json2fatturapaxml(invoice)
    const expected = fs.readFileSync('tests/xml/IT03469550986_PR002.xml', {
      encoding: 'UTF-8'
    })
    expect(result.error).toBeUndefined()
    expect(result).toEqual(expected)
  })

  test('should generate xml for private customer (not company)', () => {
    const invoice = {
      FatturaElettronicaHeader: {
        DatiTrasmissione: {
          IdTrasmittente: {
            IdPaese: 'IT',
            IdCodice: '03469550986'
          },
          ProgressivoInvio: '001',
          FormatoTrasmissione: 'FPR12',
          CodiceDestinatario: '0000000'
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
            CodiceFiscale: 'AAABBB80A01A000A',
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
    expect(result.error).toBeUndefined()
  })
})
