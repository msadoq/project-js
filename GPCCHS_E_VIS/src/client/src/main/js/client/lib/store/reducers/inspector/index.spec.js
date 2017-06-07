import { should, freezeArgs } from '../../../common/test';
import * as actions from '../../actions/inspector';
import inspectorReducer, {
  getInspectorViewId,
  getInspectorViewType,
  getInspectorEpId,
  getInspectorDataId,
  getInspectorEpName,
  getInspectorField,
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
    expect(typeof r).toBe('object')
      .that.has.properties({
        viewId: null,
        viewType: null,
        epId: null,
        epName: null,
        dataId: null,
        field: null,
      });
    expect(r).toHaveProperty('staticData')
      .that.equals(null);
  });
  it('should ignore unknown action', () => {
    const state = {
      remoteId: 'remoteId',
      dataId: { parameterName: 'param' },
      displayingTM: true,
      staticData: { name: 'param' },
    };
    expect(reducer(state, {})).toBe(state);
  });
  // GENERAL
  it('should set inspector data id', () => {
    expect(
      reducer(undefined, actions.setInspectorGeneralData('viewId', 'viewType', 'epId', 'epName', 'dataId', 'field'))
    ).have.a.property('generalData').toEqual({
      viewId: 'viewId',
      viewType: 'viewType',
      epId: 'epId',
      epName: 'epName',
      dataId: 'dataId',
      field: 'field',
      displayingTM: false,
    });
  });
  it('should set inspector data id', () => {
    expect(reducer(undefined, actions.deleteInspectorGeneralData())).have.a.property('generalData').toEqual({
      viewId: null,
      viewType: null,
      epId: null,
      epName: null,
      dataId: null,
      field: null,
      displayingTM: false,
    });
  });
  it('should update inspector TM display status', () => {
    expect(typeof reducer(undefined, actions.isInspectorDisplayingTM(true))).toBe('object')
    .that.has.a.property('displayingTM').toEqual(true);
  });
  // STATIC DATA
  it('should set inspector static data', () => {
    expect(reducer(undefined, actions.setInspectorStaticData({ name: 'param' }))).toHaveProperty('staticData').that.have.properties({ name: 'param' });
    expect(
      reducer({ staticData: { name: 'param' } }, actions.setInspectorStaticData({ type: 'link' }))
    ).toHaveProperty('staticData').that.have.properties({ type: 'link' });
  });
  it('should update inspector static data loading state', () => {
    expect(reducer(undefined, actions.isInspectorStaticDataLoading(true))).toHaveProperty('staticData').that.have.properties({ loading: true });
    expect(
      reducer({ staticData: { name: 'param' } }, actions.isInspectorStaticDataLoading(true))
    ).toHaveProperty('staticData').that.have.properties({ name: 'param', loading: true });
  });
  it('should toggled all inspector static data nodes', () => {
    expect(
      reducer(undefined, actions.toggleAllInspectorStaticDataNodes(false)).staticData
    ).toBeFalsy();
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
    expect(reducer(state, actions.toggleAllInspectorStaticDataNodes(true))).toHaveProperty('staticData').that.have.properties({
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
    expect(
      reducer(undefined, actions.updateInspectorStaticDataNode(['children', '0'], { name: 'param' }))
    ).toHaveProperty('staticData').that.have.properties({ children: [{ name: 'param' }] });
    expect(
      reducer({ staticData: { name: 'param', children: [{ name: 'foo' }, { name: 'other' }] } },
      actions.updateInspectorStaticDataNode(['children', '0'], { foo: 'bar' }))
    ).toHaveProperty('staticData').that.have.properties({ name: 'param', children: [{ name: 'foo', foo: 'bar' }, { name: 'other' }] });
  });
  it('should update inspector static data node loading state', () => {
    expect(
      reducer(undefined, actions.isInspectorStaticDataNodeLoading(['children', '0'], true))
    ).toHaveProperty('staticData').that.have.properties({ children: [{ loading: true }] });
  });
  it('should update inspector static data node toggle state', () => {
    expect(reducer(undefined, actions.isInspectorStaticDataNodeToggled([], true))).toHaveProperty('staticData').that.have.properties({ toggled: true });
    expect(
      reducer(undefined, actions.isInspectorStaticDataNodeToggled(['children', '0'], true))
    ).toHaveProperty('staticData').that.have.properties({ children: [{ toggled: true }] });
  });
});

/* --- Selectors -------------------------------------------------------------- */

describe('store:inspector:selectors', () => {
  // GENERAL
  describe('getInspectorDisplayingTM', () => {
    it('should return remoteId', () => {
      const state = {
        inspector: {
          generalData: {
            displayingTM: true,
          },
        },
      };
      expect(getInspectorDisplayingTM(state)).toEqual(true);
    });
  });
  describe('getInspectorViewId', () => {
    it('should return viewId', () => {
      const state = {
        inspector: {
          generalData: {
            viewId: 'viewId',
          },
        },
      };
      expect(getInspectorViewId(state)).toEqual('viewId');
    });
  });
  describe('getInspectorViewType', () => {
    it('should return viewType', () => {
      const state = {
        inspector: {
          generalData: {
            viewType: 'TextView',
          },
        },
      };
      expect(getInspectorViewType(state)).toEqual('TextView');
    });
  });
  describe('getInspectorEpId', () => {
    it('should return epId', () => {
      const state = {
        inspector: {
          generalData: {
            epId: 'epId',
          },
        },
      };
      expect(getInspectorEpId(state)).toEqual('epId');
    });
  });
  describe('getInspectorEpName', () => {
    it('should return epName', () => {
      const state = {
        inspector: {
          generalData: {
            epName: 'EP_NAME',
          },
        },
      };
      expect(getInspectorEpName(state)).toEqual('EP_NAME');
    });
  });
  describe('getInspectorDataId', () => {
    it('should return dataId', () => {
      const state = {
        inspector: {
          generalData: {
            dataId: {
              parameterName: 'param',
            },
          },
        },
      };
      expect(getInspectorDataId(state)).toEqual({ parameterName: 'param' });
    });
  });
  describe('getInspectorField', () => {
    it('should return field', () => {
      const state = {
        inspector: {
          generalData: {
            field: 'field',
          },
        },
      };
      expect(getInspectorField(state)).toEqual('field');
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
      expect(getInspectorStaticData(state)).toEqual({ name: 'root' });
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
      expect(getInspectorStaticDataLoading(state)).toEqual(true);
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
      expect(getInspectorStaticDataChildren(state)).toEqual([{ name: 'child1' }, { name: 'child2' }]);
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
      expect(getInspectorStaticDataNode(state, ['children', '0'])).toEqual({ name: 'child1' });
      expect(getInspectorStaticDataNode(state, ['children', '1', 'children', '0'])).toEqual({ name: 'child2' });
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
      expect(getInspectorStaticDataNodeToggled(state, ['children', '0'])).toEqual(false);
      expect(
        getInspectorStaticDataNodeToggled(state, ['children', '1', 'children', '0'])
      ).toEqual(true);
    });
  });
});
