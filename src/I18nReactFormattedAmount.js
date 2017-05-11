import React from 'react';
import PropTypes from 'prop-types';
import ReactFormattedAmount from './ReactFormattedAmount';

const I18nReactFormattedAmount = function render ({ format, lang, separator, currency, NegWrap, ...props }) {
  const childProps = {
    ...props,
    format: format || I18nReactFormattedAmount.getFormat(lang).format,
    separator: separator || I18nReactFormattedAmount.getFormat(lang).separator,
    currency: currency || I18nReactFormattedAmount.getFormat(lang).currency,
    NegWrap: NegWrap || I18nReactFormattedAmount.getFormat(lang).NegWrap,
  };

  return <ReactFormattedAmount {...childProps} />
};

I18nReactFormattedAmount.propTypes = {
  lang: PropTypes.string,
  format: ReactFormattedAmount.formatPropType,
};

I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE = 'en-US';

I18nReactFormattedAmount.formatsPerLang = {
  fr: { separator: '.', format: '%n %u', currency: '€' },
  en: { separator: '.', format: '%u %n', currency: '$' },
  ru: { separator: '.', format: '%n%u', currency: '₽', NegWrap: ({children, ...props}) => <span {...props}>{'–' + children}</span> },
};

I18nReactFormattedAmount.getFormat = (lang) => {
  let currentLanguage = lang;
  if( !currentLanguage) {
    currentLanguage = I18nReactFormattedAmount.currentLanguage();
  }
  currentLanguage = currentLanguage.split('-')[0];
  if (currentLanguage in I18nReactFormattedAmount.formatsPerLang) {
    return I18nReactFormattedAmount.formatsPerLang[currentLanguage];
  }
};

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
};

I18nReactFormattedAmount.propTypes = {
  lang: PropTypes.string,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  format: PropTypes.string,
  separator: PropTypes.string,
};

export default I18nReactFormattedAmount;
