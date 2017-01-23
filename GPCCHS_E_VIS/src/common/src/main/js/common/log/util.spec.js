require('../utils/test');

const {
  bytesConverter,
} = require('./util');

describe('log/node', () => {
  it('bytesConverter', () => {
    bytesConverter('1000').should.eql('1000 bytes');
    bytesConverter('1000000').should.eql('976.6 kB (1000000 bytes)');
    bytesConverter('10000000').should.eql('9.5 MB (10000000 bytes)');
  });
});
