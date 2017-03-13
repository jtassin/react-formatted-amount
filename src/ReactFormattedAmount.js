import React, { PropTypes } from 'react';

const FormattedAmount = function render(props) {
  const { amount, currency, format, separator } = props;
  let result = '';
  const styles = {
    negative: {
      color: 'red',
    },
  };
  const decimalAmount = Math.abs(amount / 100);
  let formattedAmount = decimalAmount.toFixed(2);
  formattedAmount = formattedAmount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace('.', separator);

  const amountAndCurrency = format.replace('%u', currency).replace('%n', formattedAmount);

  if (decimalAmount) {
    if (amount > 0) {
      result = <span>{amountAndCurrency}</span>;
    } else {
      result = (<span style={styles.negative}>({amountAndCurrency})</span>);
    }
  } else {
    result = <span>0.00 {currency}</span>;
  }
  return result;
};

FormattedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  format: PropTypes.string,
  separator: PropTypes.string,
};

FormattedAmount.defaultProps = {
  format: '%n %u',
  separator: '.',
};

export default FormattedAmount;
