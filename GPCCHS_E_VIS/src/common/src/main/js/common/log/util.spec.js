require('../utils/test');

const {
  formatProductLog,
} = require('./util');

describe.only('log/node', () => {
  it('formatProductLog', () => {
    formatProductLog('1000').should.eql('1000\n');
    formatProductLog('1000', 'workspace', '/foo/bar/baz').should.eql('1000 ["workspace","/foo/bar/baz"]\n');
  });
});
