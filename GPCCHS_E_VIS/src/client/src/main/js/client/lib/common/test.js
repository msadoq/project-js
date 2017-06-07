import { v4 } from 'uuid';
import { tmpdir } from 'os';
import _ from 'lodash';
import path from 'path';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deepFreeze from 'deep-freeze';
import Long from 'long';
import reducer from '../store/reducers/index';

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

const makeGetDispatch = () => {
  let dispatch;
  beforeEach(() => {
    dispatch = sinon.spy();
  });
  return () => dispatch;
};

const testMemoization = (selector, state, ownProps) => {
  const newState = _.cloneDeep(state);
  const newOwnProps = _.cloneDeep(ownProps);
  selector.resetRecomputations();
  expect(selector.recomputations()).toBe(0);

  const r1 = selector(newState, newOwnProps);
  expect(selector.recomputations()).toBe(1);

  const r2 = selector(newState, newOwnProps);
  expect(selector.recomputations()).toBe(1);
  expect(r1).toBe(r2);
};

const testPayloads = [];
const testHandler = (...args) => {
  _.each(args, (arg) => {
    testPayloads.push(arg);
  });
};

module.exports = {
  sinon,
  getStore,
  createGetState,
  freezeMe,
  freezeArgs,
  makeGetDispatch, // redux-thunk testing
  testMemoization, // reselect testing
  isV4: (id = '') => id.length === v4().length,
  getTmpPath: (...args) => path.resolve(tmpdir(), 'vima-tests', ...args),
  testHandler,
  testPayloads,
  Long,
};
