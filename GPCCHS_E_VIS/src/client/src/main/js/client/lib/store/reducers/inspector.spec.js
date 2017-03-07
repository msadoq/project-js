import { freezeArgs } from '../../common/test';
import * as actions from '../actions/inspector';
import inspectorReducer from './inspector';

const reducer = freezeArgs(inspectorReducer);

describe.only('store:inspector:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.have.a.property('isLoading')
      .that.equals(false);
    r.should.have.a.property('dataId')
      .that.equals(null);
    r.should.have.a.property('staticData')
      .that.is.an('object');
    Object.keys(r.staticData).should.have.lengthOf(0);
  });
  it('should ignore unknown action', () => {
    const state = {
      isLoading: false,
      dataId: 'dataId',
      staticData: { parameterName: 'param' },
    };
    reducer(state, {}).should.equal(state);
  });
  it('should update inspector static data', () => {
    reducer(undefined, actions.updateInspectorStaticData({ parameterName: 'param' }))
      .should.have.a.property('staticData').that.have.properties({ parameterName: 'param' });
  });
  it('should update inspector is loading', () => {
    reducer(undefined, actions.updateInspectorIsLoading(true))
      .should.have.a.property('isLoading').that.have.properties(true);
  });
  it('should update inspector data id', () => {
    reducer(undefined, actions.updateInspectorDataId('dataId'))
      .should.have.a.property('dataId').that.have.properties('dataId');
  });
});
