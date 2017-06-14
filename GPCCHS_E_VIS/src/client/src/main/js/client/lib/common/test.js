import { tmpdir } from 'os';
import _ from 'lodash';
import { resolve } from 'path';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getDataId } from 'common/protobuf/stubs';
import deepFreeze from 'deep-freeze';
import flattenDataId from './flattenDataId';

const registerDc = require('common/protobuf/adapters/dc');
const registerLpisis = require('common/protobuf/adapters/lpisis');

const registerProtobuf = () => {
  registerDc(resolve(__dirname, '../..', 'node_modules/common/protobuf/proto/dc')); // Temporary fix for packaging
  registerLpisis(resolve(__dirname, '../..', 'node_modules/common/protobuf/proto/lpisis')); // Temporary fix for packaging
};

const mockStore = configureMockStore([thunk]);

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

const getRemoteId = override => flattenDataId(getDataId(override));

const mockIpcReply = () => {
  //
};

module.exports = {
  mockStore, // thunk testing
  mockIpcReply, // IPC controller testing
  freezeMe, // reducers testing
  freezeArgs, // reducers testing
  testMemoization, // reselect testing
  registerProtobuf, // protobuf testing
  getTmpPath: (...args) => resolve(tmpdir(), 'vima-tests', ...args), // documentManager testing
  getRemoteId,
};
