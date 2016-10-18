import '../../../lib/common/test';
import { dataLayout, getSchemaJson } from './index';

describe('PlotView/main', () => {
  it('dataLayout', () => {
    dataLayout().should.equal('range');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
