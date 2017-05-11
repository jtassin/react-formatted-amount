import React from 'react';
import PropTypes from 'prop-types';

const FormattedAmount = function render({ amount, currency, format, separator, NegWrap, ...props }) {
  const decimalAmount = Math.abs(amount / 100);
  let formattedAmount = decimalAmount.toFixed(2);
  formattedAmount = formattedAmount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace('.', separator);

  const amountAndCurrency = format.replace('%u', currency).replace('%n', formattedAmount);

  return amount >= 0 ? <span {...props}>{amountAndCurrency}</span> : <NegWrap {...props}>{amountAndCurrency}</NegWrap>;
};

const DefaultNegWrap = ({ children, ...props }) => <span style={{ color: 'red' }} {...props}>({children})</span>;
DefaultNegWrap.propTypes = { children: PropTypes.string };

FormattedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  separator: PropTypes.string,
  NegWrap: PropTypes.func,
};

FormattedAmount.defaultProps = {
  format: '%n %u',
  separator: '.',
  NegWrap: DefaultNegWrap,
};

export default FormattedAmount;
