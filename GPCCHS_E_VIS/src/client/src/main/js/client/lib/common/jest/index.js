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
