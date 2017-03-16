import { freezeArgs } from '../../common/test';
import * as actions from '../actions/inspector';
import inspectorReducer from './inspector';

const reducer = freezeArgs(inspectorReducer);

describe('store:inspector:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.have.a.property('sessionId')
      .that.equals(null);
    r.should.have.a.property('domainId')
      .that.equals(null);
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
  it('should update inspector static data node', () => {
    reducer(undefined, actions.updateInspectorStaticDataNode(['children', '0'], { name: 'param' }))
      .should.have.a.property('staticData').that.have.properties({ children: [{ name: 'param' }] });
    reducer({ staticData: { name: 'param', children: [{ name: 'foo' }] } },
      actions.updateInspectorStaticDataNode(['children', '0'], { foo: 'bar' }))
        .should.have.a.property('staticData').that.have.properties({ name: 'param', children: [{ name: 'foo', foo: 'bar' }] });
  });
  it('should update inspector static data loading state', () => {
    reducer(undefined, actions.isInspectorStaticDataLoading(true))
      .should.have.a.property('staticData').that.have.properties({ loading: true });
  });
  it('should update inspector static data node loading state', () => {
    reducer(undefined, actions.isInspectorStaticDataNodeLoading(['children', '0'], true))
      .should.have.a.property('staticData').that.have.properties({ children: [{ loading: true }] });
  });
  it('should update inspector data id', () => {
    reducer(undefined, actions.updateInspectorDataId('dataId'))
      .should.have.a.property('dataId').that.eql('dataId');
  });
  it('should update inspector session id', () => {
    reducer(undefined, actions.updateInspectorSessionId(0))
      .should.have.a.property('sessionId').that.eql(0);
  });
  it('should update inspector domain id', () => {
    reducer(undefined, actions.updateInspectorDomainId(3))
      .should.have.a.property('domainId').that.eql(3);
  });
  it('should update inspector static data node toggle state', () => {
    reducer(undefined, actions.isInspectorStaticDataNodeToggled([], true))
      .should.have.a.property('staticData').that.have.properties({ toggled: true });
    reducer(undefined, actions.isInspectorStaticDataNodeToggled(['children', '0'], true))
      .should.have.a.property('staticData').that.have.properties({ children: [{ toggled: true }] });
  });
});
