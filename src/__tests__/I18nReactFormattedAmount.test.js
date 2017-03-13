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

  const FR_FORMAT = { separator: '.', format: '%n %u' };

  const EN_FORMAT = { separator: '.', format: '%u %n' };

  const frTarget = () => (shallow(
    <TargetReactFormattedAmount amount={200} currency="€" {...FR_FORMAT} />
  ).html());

  const enTarget = () => (shallow(
    <TargetReactFormattedAmount amount={200} currency="€" {...EN_FORMAT} />
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
        <ReactFormattedAmount amount={200} currency="€" />
      );
      expect(wrapper.html()).to.equal(enTarget());
      delete global.window.navigator.languages;
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currency="€" />
      );
      expect(wrapper.html()).to.equal(frTarget());
      global.window.navigator.language = 'en-US';
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currency="€" />
      );
      expect(wrapper.html()).to.equal(enTarget());

      delete global.window.navigator.language;
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currency="€" />
      );
      expect(wrapper.html()).to.equal(frTarget());
      global.window.navigator.userLanguage = 'en-US';
      wrapper = shallow(
        <ReactFormattedAmount amount={200} currency="€" />
      );
      expect(wrapper.html()).to.equal(enTarget());
    });
  });

  it('uses lang parameter if the lang is forced', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    const wrapper = shallow(
      <ReactFormattedAmount lang="fr" amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(frTarget());
  });

  it('adapt to brower language if format:auto is true', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    let wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(enTarget());
    global.window = {
      navigator: {
        language: 'fr',
      },
    };
    wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(frTarget());
  });

  it('renders the result in fr-FR format if the language can not be determined', () => {
    global.window = {};
    const wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(enTarget());
  });

  it('has auto formatting enabled by default', () => {
    global.window = {
      navigator: {
        language: 'en-US',
      },
    };
    let wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(enTarget());
    global.window = {
      navigator: {
        language: 'fr',
      },
    };
    wrapper = shallow(
      <ReactFormattedAmount amount={200} currency="€" />
    );
    expect(wrapper.html()).to.equal(frTarget());
  });
});

