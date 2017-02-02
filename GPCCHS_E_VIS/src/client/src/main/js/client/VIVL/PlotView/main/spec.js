import '../../../lib/common/test';
import { structureType, getSchemaJson } from './index';

describe('PlotView/main', () => {
  it('structureType', () => {
    structureType().should.equal('range');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
