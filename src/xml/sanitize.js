'use strict'

const sanitizeString = str => {
  if (typeof str != 'string' || str.length === 0) {
    return str
  }

  return str
    .replace(/à/g, "a'")
    .replace(/è/g, "e'")
    .replace(/é/g, "e'")
    .replace(/ì/g, "i'")
    .replace(/ò/g, "o'")
    .replace(/ù/g, "u'")
    .replace(/&/g, 'e')
    .replace(/\[/g, '(')
    .replace(/]/g, ')')
    .replace(/{/g, '(')
    .replace(/}/g, ')')
    .replace(/\^/g, '')
    .replace(/</g, ' ')
    .replace(/>/g, ' ')
    .replace(/€/g, 'Euro')
    .replace(/[^a-zA-Z0-9 ,.;:?!*+-_=%\/\()'+\n]/g, '')
}

const sanitizeObject = obj => {
  Object.keys(obj).forEach(key => {
    if (!obj.hasOwnProperty(key)) {
      return null
    }

    if (obj[key] !== null && typeof obj[key] === 'object') {
      return (obj[key] = sanitizeObject(obj[key]))
    }

    if (typeof obj[key] === 'string') {
      return (obj[key] = sanitizeString(obj[key]))
    }

    return obj[key]
  })

  return obj
}

module.exports = { sanitizeString, sanitizeObject }
