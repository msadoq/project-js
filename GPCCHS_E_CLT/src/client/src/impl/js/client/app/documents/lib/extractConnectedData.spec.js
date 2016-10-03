const extractConnectedData = require('./extractConnectedData');
const { should } = require('../../utils/test');
const _ = require('lodash');

describe('documents/lib', () => {
  describe('extractConnectedData', () => {
    const content = {};
    content.views = { 'c35c9cc2-6ab5-4ffc-804b-b9b0b6ddc8b3':
   { type: 'PlotView',
     configuration:
      { type: 'PlotView',
        plotViewEntryPoints:
        [{ name: 'ATT_BC_STR1VOLTAGE',
          connectedDataX:
           { formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate',
             domain: 'fr.cnes.sat1',
             timeline: 'Session 1',
             axisId: 'Time' },
          connectedDataY:
           { formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
             domain: 'fr.cnes.sat1',
             timeline: 'Session 1',
             axisId: 'VBat' },
             curveColour: '#000000' }
            ],
        title: 'VIMA Plot example',
     path: undefined,
     oId: 'plot1.json',
     uuid: 'c35c9cc2-6ab5-4ffc-804b-b9b0b6ddc8b3' },
  '325ea9de-446b-4a94-91f3-18088ef83dea':
   { type: 'TextView',
     configuration:
      { type: 'TextView',
        textViewEntryPoints:
        [{ name: 'ATT_BC_STR1VOLTAGE_EV',
            connectedData:
             { formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
               domain: 'fr.cnes.sat1',
               timeline: 'Session 1' } },
          { name: 'ATT_BC_STR1VOLTAGE_MS',
            connectedData:
             { formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.monitoringState',
               domain: 'fr.cnes.sat1',
               timeline: 'Session 1' } },
          { name: 'ATT_BC_STR1VOLTAGE_CV',
            connectedData:
             { formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.convertedValue',
               domain: 'fr.cnes*',
               timeline: 'Session*' } }],
     path: 'text1.json',
     oId: undefined,
     uuid: '325ea9de-446b-4a94-91f3-18088ef83dea' } } } };

    it('valid', (done) => {
      extractConnectedData(content, (err, val) => {
        should.not.exist(err);
        val.should.have.property('connectedData');
        _.each(content.views, (v) => {
          if (v.type === 'PlotView') {
            _.each(v.configuration.plotViewEntryPoints, (ep) => {
              should.exist(content.connectedData[ep.connectedDataX.uuid]);
              should.exist(content.connectedData[ep.connectedDataY.uuid]);
            });
          } else if (v.type === 'TextView') {
            _.each(v.configuration.textViewEntryPoints, (ep) => {
              should.exist(content.connectedData[ep.connectedData.uuid]);
            });
          }
        });
        done();
      });
    });
  });
});
