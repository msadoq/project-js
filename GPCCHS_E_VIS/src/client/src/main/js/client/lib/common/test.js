import { tmpdir } from 'os';
import path from 'path';
import chai from 'chai';
import properties from 'chai-properties';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

// process.env.DEBUG = 'off';
// process.env.PROFILING = 'off';
// process.env.MONITORING = 'off';

process.env.FMD_ROOT_DIR = path.resolve(__dirname, '../documentManager/fixtures');
process.env.WILDCARD_CHARACTER = '*';

chai.use(properties);

function getStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}

const freezeMe = o => o && deepFreeze(o);

const freezeArgs = f => (...args) => {
  const frozenArgs = args.map(arg => freezeMe(arg));
  return f(...frozenArgs);
};

module.exports = {
  should: chai.should(),
  expect: chai.expect,
  sinon,
  getStore,
  freezeMe,
  freezeArgs,
  getTmpPath: (...args) => path.resolve(tmpdir(), 'vima-tests', ...args),
};
