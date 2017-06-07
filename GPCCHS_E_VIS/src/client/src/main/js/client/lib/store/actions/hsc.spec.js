/* eslint-disable no-unused-expressions */
import { HEALTH_STATUS_CRITICAL } from 'common/constants';
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './hsc';
import { freezeMe } from '../../common/test';

describe('store:actions:hsc', () => {
  const state = freezeMe({
    timebars: {
      a: {},
      b: {},
    },
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: {},
    },
  });

  const stateCriticalWindows = freezeMe({
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: { a: HEALTH_STATUS_CRITICAL, b: null },
    },
  });

  const stateWithCodeEditor = freezeMe({
    editor: {
      textViewId: null,
    },
    health: {},
  });

  const stateWithEditorOpen = freezeMe({
    pages: {
      page1: {
        panels: {
          editorWidth: 100,
        },
      },
    },
    health: {},
  });

  let dispatch;
  const getState = () => state;
  const getStateCritical = () => stateCriticalWindows;
  const getStateWithCodeEditor = () => stateWithCodeEditor;
  const getStateWithEditorOpen = () => stateWithEditorOpen;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('smartPlay', () => {
    it('warns a message because of application is oveloaded', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getStateCritical);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');
    });
    it('warns a message because of code editor is opened', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getStateWithCodeEditor);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
    });
    it('warns a message because of editor is opened on page', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getStateWithEditorOpen);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');
    });
    it('plays', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getState);
      expect(dispatch).have.been.calledOnce;
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.HSC_PLAY,
        payload: {
          timebarUuid: 'myTimebarUuid',
        },
      });
    });
  });
});
