import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactFormattedAmount from '../ReactFormattedAmount';

/* eslint-disable no-undef */
describe('ReactFormattedAmount', () => {
  
  it('take into account the format.format prop', () => {
    let wrapper = shallow(
      <ReactFormattedAmount format={{ format: '%n =-= %u' }} amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2.00 =-= €</span>');
  });

  it('0 pad amount and add the correct currency symbol', () => {
    let wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2.00 €</span>');

    wrapper = shallow(
      <ReactFormattedAmount amount={210} currency="$" />
    );
    expect(wrapper.html()).to.equal('<span>2.10 $</span>');

    wrapper = shallow(
      <ReactFormattedAmount amount={211} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2.11 €</span>');

    wrapper = shallow(
      <ReactFormattedAmount amount={211.1} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2.11 €</span>');
  });

  it('display the amount in red with parenthesis if negative amount', () => {
    const wrapper = shallow(
      <ReactFormattedAmount amount={-200} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span style="color:red;">(2.00 €)</span>');
  });

  it('display formatted amount greater than 1000 or 1000000', () => {
    let wrapper = shallow(
      <ReactFormattedAmount amount={-200000} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span style="color:red;">(2 000.00 €)</span>');
    wrapper = shallow(
      <ReactFormattedAmount amount={-2000000} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span style="color:red;">(20 000.00 €)</span>');
    wrapper = shallow(
      <ReactFormattedAmount amount={-20000000} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span style="color:red;">(200 000.00 €)</span>');
    wrapper = shallow(
      <ReactFormattedAmount amount={-200000000} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span style="color:red;">(2 000 000.00 €)</span>');
  });

  it('display 0 amount like positive amounts', () => {
    const wrapper = shallow(
      <ReactFormattedAmount amount={0} currency="USD" />
    );
    expect(wrapper.html()).to.equal('<span>0.00 USD</span>');
  });
});

