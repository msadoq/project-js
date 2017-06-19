import { freezeArgs } from '../../../common/jest';
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
  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({
      generalData: {
        viewId: null,
        viewType: null,
        epId: null,
        epName: null,
        dataId: null,
        field: null,
        displayingTM: false,
      },
      staticData: null,
    });
  });
  test('should ignore unknown action', () => {
    const state = {
      remoteId: 'remoteId',
      dataId: { parameterName: 'param' },
      displayingTM: true,
      staticData: { name: 'param' },
    };
    expect(reducer(state, {})).toBe(state);
  });
  // GENERAL
  test('should set inspector data id', () => {
    const nextState = reducer(undefined, actions.setInspectorGeneralData('viewId', 'viewType', 'epId', 'epName', 'dataId', 'field'));
    expect(nextState).toMatchObject({
      generalData: {
        viewId: 'viewId',
        viewType: 'viewType',
        epId: 'epId',
        epName: 'epName',
        dataId: 'dataId',
        field: 'field',
        displayingTM: false,
      },
    });
  });
  test('should set inspector data id', () => {
    const nextState = reducer(undefined, actions.deleteInspectorGeneralData());
    expect(nextState).toEqual({
      generalData: {
        viewId: null,
        viewType: null,
        epId: null,
        epName: null,
        dataId: null,
        field: null,
        displayingTM: false,
      },
      staticData: null,
    });
  });
  test('should update inspector TM display status', () => {
    const nextState = reducer(undefined, actions.isInspectorDisplayingTM(true));
    expect(nextState).toMatchObject({
      generalData: {
        displayingTM: true,
      },
    });
  });
  // STATIC DATA
  test('should set inspector static data', () => {
    const nextState = reducer(undefined, actions.setInspectorStaticData({ name: 'param' }));
    expect(nextState).toMatchObject({
      staticData: { name: 'param' },
    });
    const nextState2 = reducer(nextState, actions.setInspectorStaticData({ type: 'link' }));
    expect(nextState2).toMatchObject({
      staticData: { type: 'link' },
    });
  });
  test('should update inspector static data loading state', () => {
    const nextState = reducer(undefined, actions.isInspectorStaticDataLoading(true));
    expect(nextState.staticData).toEqual({ loading: true });
    const nextState2 = reducer({ staticData: { name: 'param' } }, actions.isInspectorStaticDataLoading(true));
    expect(nextState2.staticData).toEqual({
      name: 'param',
      loading: true,
    });
  });
  test('should toggled all inspector static data nodes', () => {
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
    const nextState = reducer(state, actions.toggleAllInspectorStaticDataNodes(true));
    expect(nextState.staticData).toEqual({
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
  test('should update inspector static data node', () => {
    const nextState = reducer(undefined, actions.updateInspectorStaticDataNode(['children', '0'], { name: 'param' }));
    // TODO: here there is a problem with updeep, children should be an array
    expect(nextState.staticData).toEqual({
      children: {
        0: { name: 'param', loading: false },
      },
    });
    const nextState2 = reducer(
      { staticData: { name: 'param', children: [{ name: 'foo' }, { name: 'other' }] } },
      actions.updateInspectorStaticDataNode(['children', '0'], { name: 'param' })
    );
    expect(nextState2.staticData).toEqual({
      name: 'param',
      children: [
        { name: 'param', loading: false },
        { name: 'other' },
      ],
    });
  });
  test('should update inspector static data node loading state', () => {
    const nextState = reducer(undefined, actions.isInspectorStaticDataNodeLoading(['children', '0'], true));
    // TODO: here there is a problem with updeep, children should be an array
    expect(nextState.staticData).toEqual({
      children: {
        0: { loading: true, toggled: true },
      },
    });
  });
  test('should update inspector static data node toggle state', () => {
    const nextState = reducer(undefined, actions.isInspectorStaticDataNodeToggled([], true));
    expect(nextState.staticData).toMatchObject({ toggled: true });
    const nextState2 = reducer(undefined, actions.isInspectorStaticDataNodeToggled(['children', '0'], true));
    // TODO: here there is a problem with updeep, children should be an array
    expect(nextState2.staticData).toEqual({
      children: {
        0: {
          toggled: true,
        },
      },
    });
  });
});

/* --- Selectors -------------------------------------------------------------- */

describe('store:inspector:selectors', () => {
  // GENERAL
  describe('getInspectorDisplayingTM', () => {
    test('should return remoteId', () => {
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
    test('should return viewId', () => {
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
    test('should return viewType', () => {
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
    test('should return epId', () => {
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
    test('should return epName', () => {
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
    test('should return dataId', () => {
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
    test('should return field', () => {
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
    test('should return staticData', () => {
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
    test('should return staticData loading status', () => {
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
    test('should return staticData children', () => {
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
    test('should return staticData node', () => {
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
    test('should return staticData node toggled status', () => {
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
