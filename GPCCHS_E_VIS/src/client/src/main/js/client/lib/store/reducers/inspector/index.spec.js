import { should, freezeArgs } from '../../../common/test';
import * as actions from '../../actions/inspector';
import inspectorReducer, {
  getInspectorDataId,
  getInspectorRemoteId,
  getInspectorDisplayingTM,
  getInspectorStaticData,
  getInspectorStaticDataLoading,
  getInspectorStaticDataChildren,
  getInspectorStaticDataNode,
  getInspectorStaticDataNodeToggled,
} from '.';

const reducer = freezeArgs(inspectorReducer);

/* --- Reducer -------------------------------------------------------------- */

describe('store:inspector:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.have.a.property('remoteId')
      .that.equals(null);
    r.should.have.a.property('dataId')
      .that.equals(null);
    r.should.have.a.property('displayingTM')
      .that.equals(false);
    r.should.have.a.property('staticData')
      .that.equals(null);
  });
  it('should ignore unknown action', () => {
    const state = {
      remoteId: 'remoteId',
      dataId: { parameterName: 'param' },
      displayingTM: true,
      staticData: { name: 'param' },
    };
    reducer(state, {}).should.equal(state);
  });
  // GENERAL
  it('should update inspector remote id', () => {
    reducer(undefined, actions.updateInspectorRemoteId('remoteId'))
    .should.have.a.property('remoteId').that.eql('remoteId');
  });
  it('should update inspector data id', () => {
    reducer(undefined, actions.updateInspectorDataId({ parameterName: 'name' }))
    .should.have.a.property('dataId').that.eql({ parameterName: 'name' });
  });
  it('should update inspector data id', () => {
    reducer(undefined, actions.isInspectorDisplayingTM(true))
    .should.have.a.property('displayingTM').that.eql(true);
  });
  // STATIC DATA
  it('should set inspector static data', () => {
    reducer(undefined, actions.setInspectorStaticData({ name: 'param' }))
      .should.have.a.property('staticData').that.have.properties({ name: 'param' });
    reducer({ staticData: { name: 'param' } }, actions.setInspectorStaticData({ type: 'link' }))
      .should.have.a.property('staticData').that.have.properties({ type: 'link' });
  });
  it('should update inspector static data loading state', () => {
    reducer(undefined, actions.isInspectorStaticDataLoading(true))
    .should.have.a.property('staticData').that.have.properties({ loading: true });
    reducer({ staticData: { name: 'param' } }, actions.isInspectorStaticDataLoading(true))
    .should.have.a.property('staticData').that.have.properties({ name: 'param', loading: true });
  });
  it('should toggled all inspector static data nodes', () => {
    should.not.exist(
      reducer(undefined, actions.toggleAllInspectorStaticDataNodes(false)).staticData
    );
    const state = {
      staticData: {
        name: 'node1',
        children: [
          { name: 'node11' },
          {
            name: 'node12',
            children: [
              { name: 'node121' },
              { name: 'node122' },
            ],
          },
        ],
      },
    };
    reducer(state, actions.toggleAllInspectorStaticDataNodes(true))
    .should.have.a.property('staticData').that.have.properties({
      name: 'node1',
      toggled: true,
      children: [
        { name: 'node11', toggled: true, children: [] },
        {
          name: 'node12',
          toggled: true,
          children: [
            { name: 'node121', toggled: true, children: [] },
            { name: 'node122', toggled: true, children: [] },
          ],
        },
      ],
    });
  });
  // STATIC DATA NODE
  it('should update inspector static data node', () => {
    reducer(undefined, actions.updateInspectorStaticDataNode(['children', '0'], { name: 'param' }))
    .should.have.a.property('staticData').that.have.properties({ children: [{ name: 'param' }] });
    reducer({ staticData: { name: 'param', children: [{ name: 'foo' }, { name: 'other' }] } },
    actions.updateInspectorStaticDataNode(['children', '0'], { foo: 'bar' }))
    .should.have.a.property('staticData').that.have.properties({ name: 'param', children: [{ name: 'foo', foo: 'bar' }, { name: 'other' }] });
  });
  it('should update inspector static data node loading state', () => {
    reducer(undefined, actions.isInspectorStaticDataNodeLoading(['children', '0'], true))
      .should.have.a.property('staticData').that.have.properties({ children: [{ loading: true }] });
  });
  it('should update inspector static data node toggle state', () => {
    reducer(undefined, actions.isInspectorStaticDataNodeToggled([], true))
      .should.have.a.property('staticData').that.have.properties({ toggled: true });
    reducer(undefined, actions.isInspectorStaticDataNodeToggled(['children', '0'], true))
      .should.have.a.property('staticData').that.have.properties({ children: [{ toggled: true }] });
  });
});

/* --- Selectors -------------------------------------------------------------- */

describe('store:inspector:selectors', () => {
  // GENERAL
  describe('getInspectorDisplayingTM', () => {
    it('should return remoteId', () => {
      const state = {
        inspector: {
          displayingTM: true,
        },
      };
      getInspectorDisplayingTM(state).should.eql(true);
    });
  });
  describe('getInspectorDataId', () => {
    it('should return dataId', () => {
      const state = {
        inspector: {
          dataId: {
            parameterName: 'param',
          },
        },
      };
      getInspectorDataId(state).should.eql({ parameterName: 'param' });
    });
  });
  describe('getInspectorRemoteId', () => {
    it('should return remoteId', () => {
      const state = {
        inspector: {
          remoteId: 'remoteId',
        },
      };
      getInspectorRemoteId(state).should.eql('remoteId');
    });
  });
  // STATIC DATA
  describe('getInspectorStaticData', () => {
    it('should return staticData', () => {
      const state = {
        inspector: {
          staticData: {
            name: 'root',
          },
        },
      };
      getInspectorStaticData(state).should.eql({ name: 'root' });
    });
  });
  describe('getInspectorStaticDataLoading', () => {
    it('should return staticData loading status', () => {
      const state = {
        inspector: {
          staticData: {
            loading: true,
          },
        },
      };
      getInspectorStaticDataLoading(state).should.eql(true);
    });
  });
  describe('getInspectorStaticDataChildren', () => {
    it('should return staticData children', () => {
      const state = {
        inspector: {
          staticData: {
            children: [{ name: 'child1' }, { name: 'child2' }],
          },
        },
      };
      getInspectorStaticDataChildren(state).should.eql([{ name: 'child1' }, { name: 'child2' }]);
    });
  });
  // STATIC DATA NODE
  describe('getInspectorStaticDataNode', () => {
    it('should return staticData node', () => {
      const state = {
        inspector: {
          staticData: {
            children: [
              { name: 'child1' },
              {
                children: [
                  { name: 'child2' },
                ],
              },
            ],
          },
        },
      };
      getInspectorStaticDataNode(state, ['children', '0']).should.eql({ name: 'child1' });
      getInspectorStaticDataNode(state, ['children', '1', 'children', '0']).should.eql({ name: 'child2' });
    });
  });
  describe('getInspectorStaticDataNodeToggled', () => {
    it('should return staticData node toggled status', () => {
      const state = {
        inspector: {
          staticData: {
            children: [
              { toggled: false },
              {
                children: [
                  { toggled: true },
                ],
              },
            ],
          },
        },
      };
      getInspectorStaticDataNodeToggled(state, ['children', '0']).should.eql(false);
      getInspectorStaticDataNodeToggled(state, ['children', '1', 'children', '0']).should.eql(true);
    });
  });
});
