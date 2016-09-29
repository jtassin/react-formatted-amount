var React = require('react');
var ReactDOM = require('react-dom');
import Example1Raw from 'raw!./example1';
import Example1Comp from './example1';
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

