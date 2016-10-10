const { should } = require('../lib/common/test');
const common = require('./common');

describe('external/common', () => {
  describe('createConnectedData', () => {
    it('ok with filter', () => {
      const data = {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate',
        unit: 's',
        digits: 5,
        format: 'decimal',
        domain: '',
        timeline: 'Session 1',
        axisId: 'Time',
        filter: [{
          field: 'convertedValue',
          operator: '!=',
          operand: '0'
        }],
      };
      const cData = common.createConnectedData(data, 'id1');
      cData.should.have.all.keys(['uuid', 'formula', 'domain', 'timeline', 'filter']);
      cData.formula.should.equal(data.formula);
      cData.domain.should.equal(data.domain);
      cData.uuid.should.equal('id1');
      cData.timeline.should.equal(data.timeline);
      cData.filter.should.equal(data.filter);
    });
    it('ok without filter', () => {
      const data = {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate',
        unit: 's',
        digits: 5,
        format: 'decimal',
        domain: '',
        timeline: 'Session 1',
        axisId: 'Time',
      };
      const cData = common.createConnectedData(data, 'id1');
      cData.should.have.all.keys(['uuid', 'formula', 'domain', 'timeline']);
      cData.formula.should.equal(data.formula);
      cData.domain.should.equal(data.domain);
      cData.uuid.should.equal('id1');
      cData.timeline.should.equal(data.timeline);
    });
  });
  describe('moveConnectedData', () => {
    it('ok', () => {
      const data = {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate',
        unit: 's',
        digits: 5,
        format: 'decimal',
        domain: '',
        timeline: 'Session 1',
        axisId: 'Time',
        filter: [{
          field: 'convertedValue',
          operator: '!=',
          operand: '0'
        }],
      };

      const returnedData = common.moveConnectedData(data);
      returnedData.dataToStore.should.be.an('object');
      returnedData.dataToStore.should.have.all.keys(
        ['uuid', 'formula', 'domain', 'timeline', 'filter']);
      returnedData.dataToStore.formula.should.equal(data.formula);
      returnedData.dataToStore.domain.should.equal(data.domain);
      returnedData.dataToStore.uuid.should.equal(returnedData.connectedData.uuid);
      returnedData.dataToStore.timeline.should.equal(data.timeline);
      returnedData.dataToStore.filter.should.equal(data.filter);
      returnedData.connectedData.should.be.an('object');
      returnedData.connectedData.should.not.have.keys(['formula', 'domain', 'timeline', 'filter']);
      returnedData.connectedData.should.contains.keys('uuid');
    });
  });
});
