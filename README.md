# react-formatted-amount
[![npm version](https://badge.fury.io/js/react-formatted-amount.svg)](https://badge.fury.io/js/react-formatted-amount) 
[![Build Status](https://travis-ci.org/jtassin/react-formatted-amount.svg?branch=master)](https://travis-ci.org/jtassin/react-formatted-amount)

React component for displaying formatted amount with currency


## Demo & Examples

Live demo: [jtassin.github.io/react-formatted-amount](http://jtassin.github.io/react-formatted-amount/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:3000) in a browser.


## Installation

The easiest way to use react-formatted-amount is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/ReactFormattedAmount.min.js` i n your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-formatted-amount --save
```


## Usage

One installed, just require and use the component:
```javascript
import React from `react`;
import FormattedAmount from 'formatted-amount';

React.render(<FormattedAmount amount={1337} currency={'€'} />, document.querySelector('#main'));
```


### Properties

* amount : The aount in cents to represent
* currency : The currency to display

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. 

## License

MIT, see [LICENSE](/LICENSE) for details.

## Contributors

[![Julien TASSIN](https://avatars0.githubusercontent.com/u/1771191?v=3&s=144)](https://github.com/roylee0704/) |
---|
[Julien TASSIN](https://github.com/jtassin) |

Copyright (c) 2016 Julien TASSIN.

