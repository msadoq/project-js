import chai from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import properties from 'chai-properties';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _cloneDeep from 'lodash/cloneDeep';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

process.env.PROFILING = 'off';
process.env.MONITORING = 'off';
process.env.FMD_ROOT =
  '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/impl/js/client/lib/documentsManager/examples/';
require('dotenv-safe').load();
// import 'babel-polyfill';
// import { jsdom } from 'jsdom';

chai.use(properties);

// global.document = jsdom('<!doctype html><html><body></body></html>');
// global.window = document.defaultView;
// global.navigator = global.window.navigator;

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
  freezeMe: o => deepFreeze(_cloneDeep(o)),
};
