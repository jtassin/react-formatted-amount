import React from 'react';
import Playground  from 'component-playground';
import ReactFormattedAmount from '../../src/ReactFormattedAmount';

export default React.createClass({
	render () {
		return (
			<div style={{backgroundColor: 'white'}}>
				<Playground codeText={"<ReactFormattedAmount amount={-1337} currency={'£'}/>"} scope={{React: React, ReactFormattedAmount: ReactFormattedAmount}}/>
			</div>
		);
	}
});
