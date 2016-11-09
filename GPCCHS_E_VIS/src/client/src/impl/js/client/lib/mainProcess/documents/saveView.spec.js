const { saveViewAs, saveView } = require('./saveView');
const { expect } = require('chai');
const fs = require('../../common/fs');
const { join } = require('path');
const validation = require('./validation');
const vivl = require('../../../VIVL/main');

describe('mainProcess/documents/saveViews', () => {
  const state = {
    views: {
      text1: {
        type: 'TextView',
        configuration: {
          title: 'TextView One parameter',
          type: 'TextView',
          entryPoints: [
            { name: 'AGA_AM_PRIORITY',
            connectedData:
             { formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.extractedValue',
               unit: 'V',
               digits: 5,
               format: 'decimal',
               filter: [],
               domain: 'fr.cnes.sat1',
               timeline: 'Session 1' }
             }
          ],
          links: [],
          defaultRatio: {
            length: 50,
            width: 50
          },
          content:
           ['<style>',
             '  .myTextView {float: left; background-color: white; font-size: 1.2rem; }',
             '  .myTextView .myContener { background-color: #c5ccd3; margin-top: 8px; margin-left: 12px; padding:0.3em; float: left; border-radius: 5px; border: 2px ridge #596673; height: 80px; width: 200px; }',
             '  .myContener .name {display: block;  border-radius: 5px; overflow: hidden; margin-left: 10px; background-color: white; color: black; font-weight: bolder; margin-top: 5px;text-align: center;}',
             '  .myContener .value { display: block; border-radius: 5px;  overflow: hidden; margin-left: 10px; background-color: black; color: #00ff00; font-weight: bold; text-align: left; padding: 10px; margin-bottom: 10px; }',
             '</style>',
             '<div class=\'myTextView\'>',
             '    <div class=\'myContener\'><span class=\'name\'>AGA_AM_PRIORITY</span><span class=\'value\'>{{AGA_AM_PRIORITY}}</span></div>',
             '</div>'] },
        path: './views/text1.json',
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
            { name: 'ATT_BC_REVTCOUNT4',
             connectedDataX:
              { formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.groundDate',
                unit: 's',
                digits: 5,
                format: 'decimal',
                domain: 'fr.cnes.sat1',
                timeline: 'Session 1',
                axisId: 'Time' },
             connectedDataY:
              { formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.extractedValue',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                domain: 'fr.cnes.sat1',
                timeline: 'Session 1',
                axisId: 'VBat' },
             lineStyle: 'Continuous',
             pointsStyle: 'None',
             curveColour: '#DF013A',
             stateColours: [] }
          ],
          axes: [],
          grids: [],
          title: 'Plotview 4 parameters',
          titleStyle: {},
          plotBackgroundColour: '#FFFFFF',
          legend: {},
          markers: [],
        },
        path: 'views/plot1.json',
      }
    },
    workspace: {
      folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testViews',
    }
  };

  const folder = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs/';
  const pathPlot = './views/testPlot.json';
  const pathText = './views/testText.json';

  describe('PlotView', () => {
    it('saveAs ok', () => {
      expect(saveViewAs(state, 'plot1', join(folder, pathPlot))).to.not.be.an('error');
    });
    it('check new plot view validity', (done) => {
      fs.readJsonFromPath(folder, pathPlot, (err, viewContent) => {
        if (err) {
          console.log('readJsonFromPath', err);
        }
        expect(err).to.be.an('null');
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        if (valErr) {
          console.log('validation', valErr);
        }
        expect(valErr).to.be.an('undefined');
        done();
      });
    });
    it('save ok', () => {
      expect(saveView(state, 'plot1')).to.not.be.an('error');
    });
    it('check new plot view validity', (done) => {
      fs.readJsonFromPath(state.workspace.folder, state.views.plot1.path, (err, viewContent) => {
        if (err) {
          console.log('readJsonFromPath', err);
        }
        expect(err).to.be.an('null');
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        if (valErr) {
          console.log('validation', valErr);
        }
        expect(valErr).to.be.an('undefined');
        done();
      });
    });
  });
  describe('TextView', () => {
    it('saveAs ok', () => {
      expect(saveViewAs(state, 'text1', join(folder, pathText))).to.not.be.an('error');
    });
    it('check new text view validity', (done) => {
      fs.readJsonFromPath(folder, pathText, (err, viewContent) => {
        if (err) {
          console.log('readJsonFromPath', err);
        }
        expect(err).to.be.an('null');
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        if (valErr) {
          console.log('validation', valErr);
        }
        expect(valErr).to.be.an('undefined');
        done();
      });
    });
    it('save ok', () => {
      expect(saveView(state, 'text1')).to.not.be.an('error');
    });
    it('check new text view validity', (done) => {
      fs.readJsonFromPath(state.workspace.folder, state.views.text1.path, (err, viewContent) => {
        if (err) {
          console.log('readJsonFromPath', err);
        }
        expect(err).to.be.an('null');
        const schema = vivl(viewContent.type, 'getSchemaJson')();
        const valErr = validation(viewContent.type, viewContent, schema);
        if (valErr) {
          console.log('validation', valErr);
        }
        expect(valErr).to.be.an('undefined');
        done();
      });
    });
  });
});
