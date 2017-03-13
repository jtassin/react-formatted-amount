import React, { PropTypes } from 'react';

const FormattedAmount = function(props) {
  const { amount, currency } = props;
  let result = '';
  const styles = {
    negative: {
      color: 'red',
    },
  };
  const decimalAmount = Math.abs(amount / 100);
  const formattedAmount = decimalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
  if (decimalAmount) {
    if (amount > 0) {
      result = <span>{formattedAmount} {currency}</span>;
    } else {
      result = (<span style={styles.negative}>({formattedAmount} {currency})</span>);
    }
  } else {
    result = <span>0.00 {currency}</span>;
  }
  return result; 
}

FormattedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default FormattedAmount;
