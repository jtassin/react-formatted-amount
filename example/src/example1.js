var React = require('react');
import ReactFormattedAmount from '../../src/ReactFormattedAmount';

export default React.createClass({
	render () {
		return (
			<div>
				<ReactFormattedAmount amount={512} currency="€"/>
			</div>
		);
	}
});

