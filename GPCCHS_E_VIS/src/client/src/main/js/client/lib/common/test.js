import { v4 } from 'uuid';
import { tmpdir } from 'os';
import _ from 'lodash';
import path from 'path';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import properties from 'chai-properties';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

global.testConfig = {
  ISIS_DOCUMENTS_ROOT: path.resolve(__dirname, '../documentManager/fixtures'),
  WILDCARD_CHARACTER: '*',
  VISUWINDOW_MAX_LENGTH: 42,
  STATE_COLORS: {
    alarm: 'orangered',
    critical: 'red',
    info: 'white',
    outOfRange: 'grey',
    severe: 'darkred',
    warning: 'orange',
    nonsignificant: 'lightgrey',
    obsolete: 'tan',
  },
};

_.set(
  global,
  'parameters.get',
  p => _.get(global.testConfig, p)
);

chai.use(properties);
chai.use(sinonChai);

function getStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}

const createGetState = ([...states]) => {
  const getState = sinon.stub();
  const frozenStates = states.map(freezeMe);
  const lastState = frozenStates[frozenStates.length - 1];
  getState.returns(lastState);
  frozenStates.forEach((state, i) => {
    getState.onCall(i).returns(state);
  });
  return getState;
};

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
  createGetState,
  freezeMe,
  freezeArgs,
  isV4: (id = '') => id.length === v4().length,
  getTmpPath: (...args) => path.resolve(tmpdir(), 'vima-tests', ...args),
};
