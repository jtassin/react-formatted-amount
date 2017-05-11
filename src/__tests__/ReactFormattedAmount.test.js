import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactFormattedAmount from '../ReactFormattedAmount';

/* eslint-disable no-undef */
describe('ReactFormattedAmount', () => {
  it('take into account the format.format prop', () => {
    const wrapper = shallow(
      <ReactFormattedAmount format="%n =-= %u" amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2.00 =-= €</span>');
  });

  it('take into account the format.separator prop', () => {
    const wrapper = shallow(
      <ReactFormattedAmount separator="SEPARATOR" amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal('<span>2SEPARATOR00 €</span>');
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

  const RuNegWrap = ({ children, ...props }) => <span {...props}>{`–${children}`}</span>;
  RuNegWrap.propTypes = { children: PropTypes.string };

  it('display the amount in custom locale', () => {
    const wrapper = shallow(
      <ReactFormattedAmount amount={-200} currency="₽" format="%n%u" NegWrap={RuNegWrap} />
    );
    expect(wrapper.html()).to.equal('<span>–2.00₽</span>');
  });

  describe('pass custom props', () => {
    it('with positive amount', () => {
      const wrapper = shallow(
        <ReactFormattedAmount amount={100500} currency="₽" format="%n%u" NegWrap={RuNegWrap} className="foo bar" />
      );
      expect(wrapper.html()).to.equal('<span class="foo bar">1 005.00₽</span>');
    });
    it('with negative amount', () => {
      const wrapper = shallow(
        <ReactFormattedAmount amount={-42} currency="₽" format="%n%u" NegWrap={RuNegWrap} className="foo bar" />
      );
      expect(wrapper.html()).to.equal('<span class="foo bar">–0.42₽</span>');
    });
  });
});
