/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import cacheMap from './cacheMap';
import dataMap from './dataMap';

import testState from './state.json';

import extractInterval from '../../common/extractInterval';


describe.only('data:cacheMap', () => {
  const store = getStore(testState.committedState);
  const map = dataMap(store.getState());
  const requests = store.getState().dataRequests;

  it('', () => {
    //const expiredRequests = cacheMap(store.getState());
    console.log('[[0, 7], [11, 14]], [12, 13]', extractInterval([[0, 7], [11, 14]], [12, 13]));
    console.log('[[0, 7], [11, 14]], [0, 7]', extractInterval([[0, 7], [11, 14]], [0, 7]));
    console.log('[[0, 7], [11, 14]], [5, 7]', extractInterval([[0, 7], [11, 14]], [5, 7]));
    console.log('[[0, 7], [11, 14]], [11, 12]', extractInterval([[0, 7], [11, 14]], [11, 12]));
  });
});
