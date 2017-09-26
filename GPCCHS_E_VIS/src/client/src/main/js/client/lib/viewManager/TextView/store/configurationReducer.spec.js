// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// END-HISTORY
// ====================================================================

import * as actions from '../../../store/actions/views';
import configurationReducer from './configurationReducer';
import { freezeArgs } from '../../../common/jest';

const reducer = freezeArgs(configurationReducer);

const stateConf = {
  entryPoints: [
    {
      name: 'ATT_BC_REVTCOUNT4',
    },
    {
      name: 'ATT_BC_REVTCOUNT3',
    },
  ],
  content: '',
  search: '',
};

describe('store:reducer:TextViewConfiguration', () => {
  test('WS_VIEW_UPDATE_CONTENT', () => {
    const state = reducer(stateConf, actions.updateContent('text1', 'myContent'));
    expect(state.content).toEqual('myContent');
  });
  test('WS_VIEW_ADD_ENTRYPOINT', () => {
    const action = { type: 'WS_VIEW_ADD_ENTRYPOINT',
      payload: {
        viewId: 'text1',
        entryPoint: { name: 'ATT_BC_REVTCOUNT_new' },
      } };
    const state = reducer(stateConf, action);
    expect(state.entryPoints).toEqual([
      { name: 'ATT_BC_REVTCOUNT4' },
      { name: 'ATT_BC_REVTCOUNT3' },
      { name: 'ATT_BC_REVTCOUNT_new' },
    ]);
  });
  test('WS_VIEW_UPDATE_EDITOR_SEARCH: nothing to update', () => {
    const state = reducer(stateConf, actions.updateEditorSearch('text1', ''));
    expect(state).toEqual(stateConf);
  });
  test('WS_VIEW_UPDATE_EDITOR_SEARCH: update', () => {
    const state = reducer(stateConf, actions.updateEditorSearch('text1', 'newSearch'));
    expect(state.search).toEqual('newSearch');
  });
});
