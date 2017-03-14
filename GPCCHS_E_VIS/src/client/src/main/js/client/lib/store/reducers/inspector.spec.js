import { freezeArgs } from '../../common/test';
import * as actions from '../actions/inspector';
import inspectorReducer from './inspector';

const reducer = freezeArgs(inspectorReducer);

describe('store:inspector:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
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
  it('should update inspector static data loading state', () => {
    reducer(undefined, actions.isInspectorStaticDataLoading(true))
      .should.have.a.property('staticData').that.have.properties({ loading: true });
  });
  it('should update inspector data id', () => {
    reducer(undefined, actions.updateInspectorDataId('dataId'))
      .should.have.a.property('dataId').that.eql('dataId');
  });
  it('should update inspector static data node toggle state', () => {
    reducer(undefined, actions.isInspectorStaticDataNodeToggled([], true))
      .should.have.a.property('staticData').that.have.properties({ toggled: true });
    reducer(undefined, actions.isInspectorStaticDataNodeToggled(['children', '0'], true))
      .should.have.a.property('staticData').that.have.properties({ children: [{ toggled: true }] });
  });
});
