import { exec } from 'child_process';

import { should, getTmpPath, freezeMe, applyDependencyToApi } from '../common/test';

import fs from '../common/fs';
import validation from './validation';
import vivl from '../../VIVL/main';
import fmdApi from '../common/fmd';
import SaveView from './saveView';

const { saveView, saveViewAs } = applyDependencyToApi(SaveView, fmdApi);

describe('documentManager/saveViews', () => {
  const state = {
    views: {
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
                timeline: 'Session 1'
              }
            }
          ],
          links: [],
          defaultRatio: {
            length: 50,
            width: 50
          },
          content: "<style>  .myTextView {float: left; font-size: 1.2rem; }  .myTextView .myContener { background-color: #c5ccd3; margin-top: 8px; margin-left: 12px; padding:0.3em; float: left; border-radius: 5px; border: 2px ridge #596673; height: 80px; width: 200px; }  .myContener .name {display: block;  border-radius: 5px; overflow: hidden; margin-left: 10px; background-color: white; color: black; font-weight: bolder; margin-top: 5px;text-align: center;}  .myContener .value { display: block; border-radius: 5px;  overflow: hidden; margin-left: 10px; background-color: black; color: #00ff00; font-weight: bold; text-align: left; padding: 10px; margin-bottom: 10px; }</style><div class='myTextView'>    <div class='myContener'><span class='name'>AGA_AM_PRIORITY</span><span class='value'>{{AGA_AM_PRIORITY}}</span></div></div>"
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
            width: 50
          },
          entryPoints: [
            {
              name: 'ATT_BC_REVTCOUNT4',
              connectedDataX: {
                formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.groundDate',
                unit: 's',
                digits: 5,
                format: 'decimal',
                domain: 'fr.cnes.sat1',
                timeline: 'Session 1',
                axisId: 'id1'
              },
              connectedDataY: {
                formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.extractedValue',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                domain: 'fr.cnes.sat1',
                timeline: 'Session 1',
                axisId: 'id2'
              },
              lineStyle: 'Continuous',
              pointsStyle: 'None',
              curveColor: '#DF013A',
              stateColors: []
            }
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
      }
    },
    workspace: {
      folder: getTmpPath('testViews'),
    }
  };

  after((done) => {
    exec('rm -r '.concat(getTmpPath()), () => {
      // your callback goes here
      done();
    });
  });
  describe('PlotView', () => {
    it('saveAs ok', (done) => {
      const view = state.views.plot1;
      saveViewAs(freezeMe(view.configuration), view.type, view.absolutePath, (err) => {
        should.not.exist(err);
        done();
      });
    });
    it('check new plot view validity', (done) => {
      fs.readJsonFromAbsPath(state.views.plot1.absolutePath, (err, viewContent) => {
        should.not.exist(err);
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        should.not.exist(valErr);
        done();
      });
    });
    it('save ok', (done) => {
      saveView(freezeMe(state), 'plot1', (err) => {
        should.not.exist(err);
        done();
      });
    });
    it('check new plot view validity', (done) => {
      fs.readJsonFromAbsPath(state.views.plot1.absolutePath, (err, viewContent) => {
        should.not.exist(err);
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        should.not.exist(valErr);
        done();
      });
    });
  });
  describe('TextView', () => {
    it('saveAs ok', (done) => {
      const view = state.views.text1;
      saveViewAs(freezeMe(view.configuration), view.type, view.absolutePath, (err) => {
        should.not.exist(err);
        done();
      });
    });
    it('check new text view validity', (done) => {
      fs.readJsonFromAbsPath(state.views.text1.absolutePath, (err, viewContent) => {
        should.not.exist(err);
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        should.not.exist(valErr);
        done();
      });
    });
    it('save ok', (done) => {
      saveView(freezeMe(state), 'text1', (err) => {
        should.not.exist(err);
        done();
      });
    });
    it('check new text view validity', (done) => {
      fs.readJsonFromAbsPath(state.views.text1.absolutePath, (err, viewContent) => {
        should.not.exist(err);
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        should.not.exist(valErr);
        done();
      });
    });
  });
});