import '../../../lib/common/test';
import { structureType, getSchemaJson } from './index';

describe('DynamicView/main', () => {
  it('structureType', () => {
    structureType().should.equal('last');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
