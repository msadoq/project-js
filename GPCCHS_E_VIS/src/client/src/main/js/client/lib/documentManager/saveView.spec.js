import rimraf from 'rimraf';
import _ from 'lodash/fp';
import fs from 'fs';

import { getTmpPath, freezeMe } from '../common/test';

import * as documentManagerApi from '.';

const { saveViewAs } = documentManagerApi;

describe('documentManager/saveViews', () => {
  let state;
  beforeEach(() => {
    state = {
      views: {
        unknownAbsPath: {},
        unknownViewType: {
          type: 'Unknown view type',
          absolutePath: getTmpPath('testAs/views/unknownViewType.json'),
          configuration: {},
        },
        dynamic1: {
          type: 'DynamicView',
          isModified: false,
          configuration: {
            title: 'Dynamic view',
            links: [],
            defaultRatio: {
              length: 5,
              width: 3,
            },
            entryPoints: [
              {
                connectedData: {
                  formula: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>',
                  filter: [],
                  domain: 'fr.cnes.isis.simupus',
                  timeline: 'Session 1',
                },
                name: 'dynamicEP',
                id: '2d20116c-1c13-4c37-ad90-f15d38ce17ca',
              },
            ],
          },
          path: 'views/dynamic1.json',
          absolutePath: getTmpPath('testAs/views/dynamic1.json'),
        },
      },
      workspace: {
        folder: getTmpPath('testViews'),
      },
    };
  });

  afterEach((done) => {
    rimraf(getTmpPath(), done);
  });

  describe('saveViewAs', () => {
    it('saves the view', (done) => {
      const view = freezeMe(state.views.dynamic1);
      saveViewAs(view, view.absolutePath, (err) => {
        expect(err).toBeFalsy();
        fs.readFile(view.absolutePath, 'utf8', (error, fileContent) => {
          expect(error).toBeFalsy();
          expect(fileContent).toMatchSnapshot();
          done();
        });
      });
    });
    it('fails because invalid view', (done) => {
      const invalidView = _.set('configuration.entryPoints', ['invalid entrypoint'], state.views.dynamic1);
      const view = freezeMe(invalidView);
      saveViewAs(view, view.absolutePath, (err) => {
        expect(err).toBeInstanceOf(Error);
        fs.access(view.absolutePath, fs.constants.F_OK, (error) => {
          expect(error).toBeTruthy();
          done();
        });
      });
    });
    it('fails because no view', (done) => {
      saveViewAs(undefined, undefined, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
    it('fails because no view', (done) => {
      saveViewAs(state.views.dynamic1, '/unknownPath/view.json', (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toMatch(/Unable to create folder/);
        done();
      });
    });
    it('fails because view type is invalid', (done) => {
      saveViewAs(state.views.unknownViewType, state.views.unknownViewType.absolutePath, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
    it('fails because given path is not absolute', (done) => {
      saveViewAs(state.views.dynamic1, 'invalid relative path', (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
