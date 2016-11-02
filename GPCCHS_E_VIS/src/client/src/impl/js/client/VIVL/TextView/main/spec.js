import '../../../lib/common/test';
import { structureType, getSchemaJson } from './index';

describe('TextView/main', () => {
  it('structureType', () => {
    structureType().should.equal('last');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
