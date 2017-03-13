import React, { PropTypes } from 'react';

const FormattedAmount = function render(props) {
  const { amount, currency, format } = props;
  let result = '';
  const styles = {
    negative: {
      color: 'red',
    },
  };
  const decimalAmount = Math.abs(amount / 100);
  const formattedAmount = decimalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
  
  const amountAndCurrency = format.format.replace('%u', currency).replace('%n', formattedAmount);
  
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
  format: FormattedAmount.formatPropType,
};

FormattedAmount.formatPropType = PropTypes.shape({
  format: PropTypes.string.isRequired,
  delimiter: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired,
})

FormattedAmount.defaultProps = {
  format: {
    format: '%n %u',
    delimiter: ' ',
    separator: '.',
  },
}

export default FormattedAmount;
