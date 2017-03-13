import React, { PropTypes } from 'react';
import ReactFormattedAmount from './ReactFormattedAmount';

const I18nReactFormattedAmount = function render({ format, lang, ...rest }) {
  const childProps = Object.assign({}, rest);
  if( !format) {
    childProps.format = I18nReactFormattedAmount.getFormat(lang);
  } else {
    childProps.format = format;
  }
  return <ReactFormattedAmount {...childProps} />
}

I18nReactFormattedAmount.propTypes = {
  lang: PropTypes.string,
  format: ReactFormattedAmount.formatPropType,
}

I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE = 'en-US';

I18nReactFormattedAmount.formatsPerLang = {
  fr: { separator: '.', delimiter: ' ', format: '%n %u'},
  en: { separator: '.', delimiter: ',', format: '%u %n'},
}

I18nReactFormattedAmount.getFormat = (lang) => {
  let currentLanguage = lang;
  if( !currentLanguage) {
    currentLanguage = I18nReactFormattedAmount.currentLanguage();
  }
  if (I18nReactFormattedAmount.formatsPerLang[currentLanguage]) {
    return I18nReactFormattedAmount.formatsPerLang[currentLanguage];
  }
  currentLanguage = currentLanguage.split('-')[0];
  if (I18nReactFormattedAmount.formatsPerLang[currentLanguage]) {
    return I18nReactFormattedAmount.formatsPerLang[currentLanguage];
  }
}

I18nReactFormattedAmount.currentLanguage = () => {
  if (typeof window === 'undefined') {
    return I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE;
  }
  if (!window.navigator) {
    return I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE;
  }
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  }
  if (window.navigator.language) {
    return window.navigator.language;
  }
  if (window.navigator.userLanguage) {
    return window.navigator.userLanguage;
  }
}

I18nReactFormattedAmount.propTypes = {
  lang: PropTypes.string,
};

I18nReactFormattedAmount.defaultProps = {
}

export default I18nReactFormattedAmount;
