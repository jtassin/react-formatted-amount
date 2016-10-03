var React = require('react');
var ReactDOM = require('react-dom');
import ReactFormattedAmount from '../../src/ReactFormattedAmount';
import githubLight from './github-light.css';
import normalize from './normalize.css';
import stylesheet from './stylesheet.css';
import Playground  from 'component-playground';

var Example1 = React.createClass({ 
	render () {
		return (
			<div style={{backgroundColor: 'white'}}>
				<Playground codeText={"<ReactFormattedAmount amount={1337} currency={'$'}/>"} scope={{React: React, ReactFormattedAmount: ReactFormattedAmount}}/>
			</div>
		);
	}
});

ReactDOM.render(<Example1 />, document.getElementById('example1'));


var Example2 = React.createClass({
	render () {
		return (
			<div style={{backgroundColor: 'white'}}>
				<Playground codeText={"<ReactFormattedAmount amount={-1337} currency={'£'}/>"} scope={{React: React, ReactFormattedAmount: ReactFormattedAmount}}/>
			</div>
		);
	}
});

ReactDOM.render(<Example2 />, document.getElementById('example2'));

var Example3 = React.createClass({
	render () {
		return (
			<div style={{backgroundColor: 'white'}}>
				<Playground codeText={"<ReactFormattedAmount amount={1337003658} currency={'€'}/>"} scope={{React: React, ReactFormattedAmount: ReactFormattedAmount}}/>
			</div>
		);
	}
});

ReactDOM.render(<Example3 />, document.getElementById('example3'));
