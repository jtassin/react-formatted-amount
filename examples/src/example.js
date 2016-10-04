import React from 'react';
import ReactDOM from 'react-dom';
import githubLight from './github-light.css';
import normalize from './normalize.css';
import stylesheet from './stylesheet.css';

import Example1 from './example1';

ReactDOM.render(<Example1 />, document.getElementById('example1'));

import Example2 from './example2';

ReactDOM.render(<Example2 />, document.getElementById('example2'));

import Example3 from './example3';

ReactDOM.render(<Example3 />, document.getElementById('example3'));
