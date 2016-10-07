require('../utils/test');
const localId = require('./localId');

describe('utils/localId', () => {
  it('works', () => {
    localId('PlotView', 'extractedValue', 120, 10)
      .should.equal('PlotView.extractedValue.120:10');
  });
});
