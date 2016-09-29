var React = require('react');
var ReactDOM = require('react-dom');
var ReactFormattedAmount = require('react-formatted-amount');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactFormattedAmount />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
