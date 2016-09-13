require('dotenv-safe').load();
import chai from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import properties from 'chai-properties';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../store/mutations/index';

//import 'babel-polyfill';
//import { jsdom } from 'jsdom';

chai.use(properties);

//global.document = jsdom('<!doctype html><html><body></body></html>');
//global.window = document.defaultView;
//global.navigator = global.window.navigator;

function getStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}

module.exports = {
  should: chai.should(),
  expect: chai.expect,
  getStore,
};
