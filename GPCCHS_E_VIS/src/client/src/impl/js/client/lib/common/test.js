import chai from 'chai';
import properties from 'chai-properties';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _cloneDeep from 'lodash/cloneDeep';
import deepFreeze from 'deep-freeze';
import reducer from '../store/reducers/index';

process.env.DEBUG = '';
process.env.LEVEL = 'ERROR';
process.env.PROFILING = 'off';
process.env.MONITORING = 'off';
process.env.FMD_ROOT_DIR =
  '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/impl/js/client/lib/documentsManager/examples/';

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
  getStore,
  freezeMe: o => deepFreeze(_cloneDeep(o)),
};
