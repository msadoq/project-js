/* eslint-disable no-unused-expressions */
import rimraf from 'rimraf';

import { should, expect, getTmpPath, freezeMe } from '../common/test';

import fs from '../common/fs';
import * as saveViewApi from './saveView';

const { saveViewAs } = saveViewApi;

describe('documentManager/saveViews', () => {
  let state;
  beforeEach(() => {
    state = {
      views: {
        unknownAbsPath: {},
        unknownViewType: {
          absolutePath: getTmpPath('testAs/views/unknownViewType.json'),
          configuration: { type: 'Unknown View Type' },
        },
        text1: {
          type: 'TextView',
          configuration: {
            title: 'TextView One parameter',
            type: 'TextView',
            entryPoints: [
              {
                name: 'AGA_AM_PRIORITY',
                connectedData: {
                  formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.extractedValue',
                  unit: 'V',
                  digits: 5,
                  format: 'decimal',
                  filter: [],
                  domain: 'fr.cnes.sat1',
                  timeline: 'Session 1',
                },
              },
            ],
            links: [],
            defaultRatio: {
              length: 50,
              width: 50,
            },
            content: "<style>  .myTextView {float: left; font-size: 1.2rem; }  .myTextView .myContener { background-color: #c5ccd3; margin-top: 8px; margin-left: 12px; padding:0.3em; float: left; border-radius: 5px; border: 2px ridge #596673; height: 80px; width: 200px; }  .myContener .name {display: block;  border-radius: 5px; overflow: hidden; margin-left: 10px; background-color: white; color: black; font-weight: bolder; margin-top: 5px;text-align: center;}  .myContener .value { display: block; border-radius: 5px;  overflow: hidden; margin-left: 10px; background-color: black; color: #00ff00; font-weight: bold; text-align: left; padding: 10px; margin-bottom: 10px; }</style><div class='myTextView'>    <div class='myContener'><span class='name'>AGA_AM_PRIORITY</span><span class='value'>{{AGA_AM_PRIORITY}}</span></div></div>",
          },
          path: './views/text1.json',
          absolutePath: getTmpPath('testAs/views/text1.json'),
        },
        plot1: {
          type: 'PlotView',
          configuration: {
            type: 'PlotView',
            links: [],
            procedures: [],
            defaultRatio: {
              length: 50,
              width: 50,
            },
            entryPoints: [
              {
                name: 'ATT_BC_REVTCOUNT4',
                connectedData: {
                  formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.extractedValue',
                  fieldX: 'groundDate',
                  unit: 'V',
                  digits: 5,
                  format: 'decimal',
                  domain: 'fr.cnes.sat1',
                  timeline: 'Session 1',
                  axisId: 'id2',
                },
                lineStyle: 'Continuous',
                pointsStyle: 'None',
                curveColor: '#DF013A',
                stateColors: [],
              },
            ],
            axes: {
              id1: { label: 'TIME', id: 'id1', unit: 'S' },
              id2: { label: 'VBAT', id: 'id2', unit: 'V' },
            },
            grids: [],
            title: 'Plotview 4 parameters',
            titleStyle: {},
            backgroundColor: '#FFFFFF',
            legend: {},
            markers: [],
          },
          path: 'views/plot1.json',
          absolutePath: getTmpPath('testAs/views/plot1.json'),
        },
        dynamic1: {
          type: 'DynamicView',
          isModified: false,
          configuration: {
            title: 'Dynamic view',
            type: 'DynamicView',
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
  describe('PlotView', () => {
    it('saveAs ok', (done) => {
      const view = freezeMe(state.views.plot1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        should.not.exist(err);
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.true;
          done();
        });
      });
    });
    it('saveAs fail', (done) => {
      state.views.plot1.configuration.title = undefined;
      const view = freezeMe(state.views.plot1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        expect(err).to.be.an('error');
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.false;
          done();
        });
      });
    });
  });
  describe('TextView', () => {
    it('saveAs ok', (done) => {
      const view = freezeMe(state.views.text1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        should.not.exist(err);
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.true;
          done();
        });
      });
    });
    it('saveAs fail', (done) => {
      state.views.text1.configuration.content = undefined;
      const view = freezeMe(state.views.text1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        expect(err).to.be.an('error');
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.false;
          done();
        });
      });
    });
  });
  describe('DynamicView', () => {
    it('saveAs ok', (done) => {
      const view = freezeMe(state.views.dynamic1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        should.not.exist(err);
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.true;
          done();
        });
      });
    });
    it('saveAs fail', (done) => {
      state.views.dynamic1.configuration.entryPoints = ['invalid entrypoints'];
      const view = freezeMe(state.views.dynamic1);
      saveViewAs(view, view.type, view.absolutePath, (err) => {
        expect(err).to.be.an('error');
        fs.isExists(view.absolutePath, (exist) => {
          exist.should.be.false;
          done();
        });
      });
    });
  });
});
