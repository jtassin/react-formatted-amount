import React from 'react';
import Playground from 'component-playground';
import ReactFormattedAmount from '../../src/ReactFormattedAmount';

export default function () {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Playground
        codeText={"<ReactFormattedAmount amount={1337003658} currency={'€'}/>"}
        scope={{ React: React, ReactFormattedAmount: ReactFormattedAmount }}/>
    </div>
  );
}
