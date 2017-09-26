// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename ui/editor reducer test describe
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/ui';
import editorReducer from './editor';

const reducer = freezeArgs(editorReducer);

describe('store:reducers:ui:editor', () => {
  describe('update tab', () => {
    test('should update tab', () => {
      expect(reducer(undefined, actions.updateViewTab('myId', 1))).toEqual({
        myId: {
          tab: 1,
        },
      });
    });
  });

  describe('update panels', () => {
    test('should update panels', () => {
      expect(
        reducer(undefined, actions.updateViewPanels('myId', 'panels', ['panelOne', 'panelTwo']))
      ).toEqual({
        myId: {
          panels: { panelOne: true, panelTwo: true },
        },
      });
    });
  });

  describe('update subpanels', () => {
    test('should update subpanels', () => {
      expect(
        reducer(undefined, actions.updateViewSubPanels('myId', 'panels', 'panelOne', ['subpanelOne', 'subpanelTwo']))
      ).toEqual({
        myId: {
          panels: { panelOne: ['subpanelOne', 'subpanelTwo'] },
        },
      });
    });
  });
});
