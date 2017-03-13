import React from 'react';
import Playground from 'component-playground';
import ReactFormattedAmount from '../../src/I18nReactFormattedAmount';

export default function () {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Playground
        codeText={"<ReactFormattedAmount amount={-1337} currency={'£'}/>"}
        scope={{ React: React, ReactFormattedAmount: ReactFormattedAmount }}/>
    </div>
  );
}
