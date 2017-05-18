/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/ui';
import uiReducer from '.';

const reducer = freezeArgs(uiReducer);

describe('store:ui:reducer', () => {
  describe('update tab', () => {
    it('should update tab', () => {
      reducer(undefined, actions.updateViewTab('myId', 1))
        .should.eql({
          editor: {
            myId: {
              tab: 1,
            },
          },
        });
    });
  });

  describe('update panels', () => {
    it('should update panels', () => {
      reducer(undefined, actions.updateViewPanels('myId', 'panels', ['panelOne', 'panelTwo']))
        .should.eql({
          editor: {
            myId: {
              panels: { panelOne: true, panelTwo: true },
            },
          },
        });
    });
  });

  describe('update subpanels', () => {
    it('should update subpanels', () => {
      reducer(undefined, actions.updateViewSubPanels('myId', 'panels', 'panelOne', ['subpanelOne', 'subpanelTwo']))
        .should.eql({
          editor: {
            myId: {
              panels: { panelOne: ['subpanelOne', 'subpanelTwo'] },
            },
          },
        });
    });
  });
});
