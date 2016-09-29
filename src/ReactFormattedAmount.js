import React, { PropTypes, PureComponent } from 'react';

class FormattedAmount extends PureComponent {

	static propTypes = {
		amount: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	};

	render() {
		let result = '';
		const styles = {
			negative: {
				color: 'red',
			},
		};
		const amount = Math.abs(this.props.amount / 100);
		const formattedAmount = amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
		if (this.props.amount) {
			if (this.props.amount > 0) {
				result = <span>{formattedAmount} {this.props.currency}</span>;
			} else {
				result = (<span style={styles.negative}>
				({formattedAmount} {this.props.currency})
			</span>);
			}
		} else {
			result = <span>0.00 {this.props.currency}</span>;
		}
		return result;
	}
}

export default FormattedAmount;
