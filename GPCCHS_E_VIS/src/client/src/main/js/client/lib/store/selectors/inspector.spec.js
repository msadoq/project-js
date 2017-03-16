import '../../common/test';
import {
  getInspectorStaticData,
  getInspectorStaticDataLoading,
  getInspectorDataId,
  getInspectorSessionId,
  getInspectorDomainId,
  getInspectorStaticDataNodeToggled,
} from './inspector';

describe('store:inspector:selectors', () => {
  describe('getInspectorStaticData', () => {
    it('should return data', () => {
      const state = { inspector: { staticData: { foo: 'bar' } } };
      getInspectorStaticData(state).should.eql({ foo: 'bar' });
    });
  });
  describe('getInspectorStaticDataLoading', () => {
    it('should return loading status', () => {
      const state = { inspector: { staticData: { loading: true } } };
      getInspectorStaticDataLoading(state).should.eql(true);
    });
  });
  describe('getInspectorSessionId', () => {
    it('should return session id', () => {
      const state = { inspector: { sessionId: 42 } };
      getInspectorSessionId(state).should.eql(42);
    });
  });
  describe('getInspectorDomainId', () => {
    it('should return domain id', () => {
      const state = { inspector: { domainId: 42 } };
      getInspectorDomainId(state).should.eql(42);
    });
  });
  describe('getInspectorDataId', () => {
    it('should return data id', () => {
      const state = { inspector: { dataId: 'foobar' } };
      getInspectorDataId(state).should.eql('foobar');
    });
  });
  describe('getInspectorStaticDataNodeToggled', () => {
    it('should return toggle status', () => {
      const state = { inspector: { staticData: { toggled: true } } };
      getInspectorStaticDataNodeToggled(state, []).should.eql(true);
      const otherState =
        { inspector: { staticData: { children: [{ children: [{ toggled: true }] }] } } };
      getInspectorStaticDataNodeToggled(otherState, ['children', '0', 'children', '0']).should.eql(true);
    });
  });
});
