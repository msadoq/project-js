import { v4 } from 'uuid';
import { tmpdir } from 'os';
import _ from 'lodash';
import path from 'path';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

const mockStore = configureMockStore([thunk]);

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

const testMemoization = (selector, state, ownProps) => {
  const newState = _.cloneDeep(state);
  const newOwnProps = _.cloneDeep(ownProps);
  selector.resetRecomputations();
  expect(selector.recomputations()).toBe(0);

  const result1 = selector(newState, newOwnProps);
  expect(selector.recomputations()).toBe(1);

  const result2 = selector(newState, newOwnProps);
  expect(selector.recomputations()).toBe(1);
  expect(result1).toEqual(result2);
};

const testPayloads = [];
const testHandler = (...args) => {
  _.each(args, (arg) => {
    testPayloads.push(arg);
  });
};

module.exports = {
  sinon, // TODO: USELESS: prefer directly import sinon
  getStore, // TODO: use mockStore instead
  mockStore, // thunk testing
  freezeMe, // reducers testing
  freezeArgs, // reducers testing
  testMemoization, // reselect testing
  isV4: (id = '') => id.length === v4().length, // TODO: replace by a jest 'toBeV4' assertion
  getTmpPath: (...args) => path.resolve(tmpdir(), 'vima-tests', ...args), // documentManager testing
  testHandler, // used by serverProcess controllers tests
};
