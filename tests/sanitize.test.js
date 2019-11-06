'use strict'

const fs = require('fs')
const { sanitizeString, sanitizeObject } = require('../src/xml/sanitize')

describe('Sanitize', () => {
  test('should sanitize a string', () => {
    const toSanitize =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz àèéìòù 0123456789 ,;:-_*+ !"€£$%&/\\()=?^[]{}ç°§|<>'
    const expected =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz a'e'e'i'o'u' 0123456789 ,;:-_*+ !Euro%e/\\()=?()()  "

    expect(sanitizeString(toSanitize)).toEqual(expected)
  })

  test('should sanitize all values of an object', () => {
    const toSanitize = {
      foo: "C'è!<>",
      bar: {
        foo: 'àèéìòù',
        bar: {
          foo: '01234567890 €',
          bar: 'ABCdef ,.;: Euro'
        }
      }
    }

    const expected = {
      foo: "C'e'!  ",
      bar: {
        foo: "a'e'e'i'o'u'",
        bar: {
          foo: '01234567890 Euro',
          bar: 'ABCdef ,.;: Euro'
        }
      }
    }

    expect(sanitizeObject(toSanitize)).toEqual(expected)
  })
})
