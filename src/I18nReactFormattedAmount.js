import React from 'react';
import PropTypes from 'prop-types';
import ReactFormattedAmount from './ReactFormattedAmount';

const I18nReactFormattedAmount = function render(props) {
  const { format, lang, separator, currency, currencyCode, NegWrap, ...rest } = props;
  const currencyProps = !currencyCode ? { format, currency } : {
    format: format || I18nReactFormattedAmount.formatsPerCurrencyCode[currencyCode].format,
    currency: currency || I18nReactFormattedAmount.formatsPerCurrencyCode[currencyCode].currency,
  };

  const childProps = {
    ...rest,
    ...currencyProps,
    separator: separator || I18nReactFormattedAmount.getFormat(lang).separator,
    NegWrap: NegWrap || I18nReactFormattedAmount.getFormat(lang).NegWrap,
  };

  return <ReactFormattedAmount {...childProps} />;
};

I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE = 'en-US';

const RuNegWrap = ({ children, ...props }) => <span {...props}>{`–${children}`}</span>;
RuNegWrap.propTypes = { children: PropTypes.string };

// current user language
I18nReactFormattedAmount.formatsPerLang = {
  fr: { separator: '.' },
  en: { separator: '.' },
  ru: { separator: '.', NegWrap: RuNegWrap },
};

// print currency (may differ than user lang)
I18nReactFormattedAmount.formatsPerCurrencyCode = {
  eur: { format: '%n %u', currency: '€' },
  usd: { format: '%u %n', currency: '$' },
  rub: { format: '%n%u', currency: '₽' },
};

I18nReactFormattedAmount.getFormat = (lang) => {
  const currentLanguage = (lang || I18nReactFormattedAmount.currentLanguage()).split('-')[0];
  return I18nReactFormattedAmount.formatsPerLang[currentLanguage];
};

I18nReactFormattedAmount.currentLanguage = () => {
  if (typeof window === 'undefined' || !window.navigator) {
    return I18nReactFormattedAmount.DEFAULT_LANGUAGE_NODE;
  }
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  }
  return window.navigator.language || window.navigator.userLanguage;
};

I18nReactFormattedAmount.propTypes = {
  lang: PropTypes.string,
  amount: ReactFormattedAmount.propTypes.amount,
  currency: PropTypes.string,
  currencyCode: PropTypes.oneOf(Object.keys(I18nReactFormattedAmount.formatsPerCurrencyCode)),
  format: PropTypes.string,
  separator: ReactFormattedAmount.propTypes.separator,
  NegWrap: ReactFormattedAmount.propTypes.NegWrap,
};

export default I18nReactFormattedAmount;
