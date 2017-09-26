// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Automatically freeze given state to mockStore (in common/jest)
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Change adapters path in tests
// END-HISTORY
// ====================================================================

import { tmpdir } from 'os';
import _ from 'lodash/fp';
import { resolve } from 'path';
import thunk from 'redux-thunk';
import deepFreeze from 'deep-freeze';
import configureMockStore from 'redux-mock-store';
import { loadStubs, getStubData } from '../../utils/stubs';
import flattenDataId from '../flattenDataId';
import { registerGlobal } from '../../utils/adapters';

const mockedAdaptersPath = [
  {
    path: './adapters/',
    ns: 'isis',
  },
  {
    path: './adapters/',
    ns: 'dc',
  },
];

const mockLoadStubs = () => loadStubs(mockedAdaptersPath);
const mockRegister = () => registerGlobal(mockedAdaptersPath);


const dataStub = getStubData();

const freezeMe = o => o && deepFreeze(o);

const freezeArgs = f => (...args) => {
  const frozenArgs = args.map(arg => freezeMe(arg));
  return f(...frozenArgs);
};

const mockStore = _.compose(configureMockStore([thunk]), freezeMe);

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

const getRemoteId = override => flattenDataId(dataStub.getDataId(override));

const mockIpcReply = () => {
  //
};

module.exports = {
  mockStore, // thunk testing
  mockIpcReply, // IPC controller testing
  freezeMe, // reducers testing
  freezeArgs, // reducers testing
  testMemoization, // reselect testing
  mockRegister, // protobuf testing
  mockLoadStubs,
  getTmpPath: (...args) => resolve(tmpdir(), 'vima-tests', ...args), // documentManager testing
  getRemoteId,
};
