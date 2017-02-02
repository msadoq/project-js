import { tmpdir } from 'os';
import path from 'path';
import chai from 'chai';
import properties from 'chai-properties';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _cloneDeep from 'lodash/cloneDeep';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

process.env.DEBUG = '';
process.env.LEVEL = 'ERROR';
process.env.PROFILING = 'off';
process.env.MONITORING = 'off';

process.env.FMD_ROOT_DIR = path.resolve(__dirname, '../documentManager/fixtures');

chai.use(properties);

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
  sinon,
  getStore,
  freezeMe: o => deepFreeze(_cloneDeep(o)),
  getTmpPath: (...args) => path.resolve(tmpdir(), 'test', ...args),
  nextTick: f => (...args) => process.nextTick(f, ...args),
};
