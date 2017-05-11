import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactFormattedAmount from '../I18nReactFormattedAmount';
import TargetReactFormattedAmount from '../ReactFormattedAmount';

/* eslint-disable no-undef */
describe('I18nReactFormattedAmount', () => {
  beforeEach(() => {
    global.window = {
      navigator: {
        language: 'fr',
      },
    };
  });

  const FORMATS = {
    fr: { separator: '.', format: '%n %u', currency: '€' },
    en: { separator: '.', format: '%u %n', currency: '$' },
    ru: { separator: '.', format: '%n%u', currency: '₽', NegWrap: ({children, ...props}) => <span {...props}>{'–' + children}</span> },
  }
  const target = (lang) => (shallow(
    <TargetReactFormattedAmount amount={200} {...FORMATS[lang]} />
  ).html());

  describe('language detection', () => {
    it('uses in priority window.navigator.languages[0], ' +
      'then window.navigator.language ' +
      'and then, window.navigator.userLanguage', () => {
      global.window = {
        navigator: {
          languages: ['en-US', 'fr'],
          language: 'fr',
          userLanguage: 'fr',
        },
      };
      let wrapper = shallow(
        <ReactFormattedAmount amount={200} currencyCode="usd" />
      );
      expect(wrapper.html()).to.equal(target('en'));
      delete global.window.navigator.languages;
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currencyCode="eur" />
      );
      expect(wrapper.html()).to.equal(target('fr'));
      global.window.navigator.language = 'en-US';
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currencyCode="usd" />
      );
      expect(wrapper.html()).to.equal(target('en'));

      delete global.window.navigator.language;
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currencyCode="eur" />
      );
      expect(wrapper.html()).to.equal(target('fr'));
      global.window.navigator.userLanguage = 'en-US';
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currencyCode="usd" />
      );
      expect(wrapper.html()).to.equal(target('en'));
    });
  });

  it('Pass the format directly to the child if the prop is passed', () => {
    const format = "%n in %u";
    const wrapper = shallow(
      <ReactFormattedAmount format={format} amount={200} currency="€" />
    );
    const result = shallow(
      <TargetReactFormattedAmount amount={200} currency="€" format={format} />
    ).html();
    expect(wrapper.html()).to.equal(result);
  });

  it('Pass the separator directly to the child if the prop is passed', () => {
    const separator = "SEPARATOR";
    const wrapper = shallow(
      <ReactFormattedAmount separator={separator} amount={200} currencyCode="eur" />
    );
    const result = shallow(
      <TargetReactFormattedAmount amount={200} currency="€" separator={separator} />
    ).html();
    expect(wrapper.html()).to.equal(result);
  });

  it('Works (with "en" as default lang) on server side (no window)', () => {
    delete global.window;
    const wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="usd" />
    );
    expect(wrapper.html()).to.equal(target('en'));
  });

  it('uses lang parameter if the lang is forced', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    const wrapper = shallow(
      <ReactFormattedAmount lang="fr" amount={200} currencyCode="eur" />
    );
    expect(wrapper.html()).to.equal(target('fr'));
  });

  it('adapt to brower language if format:auto is true', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    let wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="usd" />
    );
    expect(wrapper.html()).to.equal(target('en'));
    global.window = {
      navigator: {
        language: 'fr',
      },
    };
    wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="eur" />
    );
    expect(wrapper.html()).to.equal(target('fr'));
  });

  it('renders the result in fr-FR format if the language can not be determined', () => {
    global.window = {};
    const wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="usd" />
    );
    expect(wrapper.html()).to.equal(target('en'));
  });

  it('has auto formatting enabled by default', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    let wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="usd" />
    );
    expect(wrapper.html()).to.equal(target('en'));
    global.window = {
      navigator: {
        language: 'fr',
      },
    };
    wrapper = shallow(
      <ReactFormattedAmount amount={200} currencyCode="eur" />
    );
    expect(wrapper.html()).to.equal(target('fr'));
  });

  it('display the amount in custom locale', () => {
    const wrapper = shallow(
      <ReactFormattedAmount amount={200} lang="ru" currencyCode="rub" />
    );
    expect(wrapper.html()).to.equal(target('ru'));
  });

  describe('pass custom props', () => {
    const target = (lang) => (shallow(
      <TargetReactFormattedAmount amount={200} {...FORMATS[lang]} className="foo bar" />
    ).html());

    it('with positive amount', () => {
      const wrapper = shallow(
        <ReactFormattedAmount amount={200} lang="ru" currencyCode="rub" className="foo bar" />
      );
      expect(wrapper.html()).to.equal(target('ru'));
    });
    it('with negative amount', () => {
      const wrapper = shallow(
        <ReactFormattedAmount amount={200} lang="ru" currencyCode="rub" className="foo bar" />
      );
      expect(wrapper.html()).to.equal(target('ru'));
    });
  });
});
