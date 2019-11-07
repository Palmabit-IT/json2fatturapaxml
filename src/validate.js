'use strict';

const Joi = require('joi');
const IT_lang = require('./joi-error-translations/IT');
const schema = require('./schemas/FatturaElettronicaSchema');

const loadLanguage = (language = '') => {
  switch (language.toUpperCase()) {
    case 'IT':
      return IT_lang;
    default:
      return {};
  }
};

module.exports = (value, opt = {}) => {
  const options = {
    abortEarly: false,
    language: loadLanguage(opt.language)
  };

  return Joi.validate(value, schema, options);
};
