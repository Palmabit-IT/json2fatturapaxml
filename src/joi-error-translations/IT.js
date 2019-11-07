module.exports = {
  number: {
    base: 'deve essere un numero.',
    min: 'deve essere maggiore o uguale a {{limit}}.',
    max: 'deve essere minore o uguale a {{limit}}.',
    integer: 'deve essere un numero '
  },
  string: {
    base: 'deve essere una stringa.',
    min: 'la lunghezza deve essere di almeno {{limit}} caratteri.',
    max: 'la lunghezza della string non deve superare i {{limit}} caratteri.',
    length: 'la lunghezza deve essere lunga {{limit}} caratteri.',
    alphanum: "puo' contenere solo caratteri alfanumerici.",
    email: 'deve essere un email valida.',
    isoDate: 'deve essere una data ISO 8601.',
    lowercase: "puo' contenere solo caratteri minuscoli.",
    uppercase: "puo' contenere solo caratteri maiuscoli."
  }
}
