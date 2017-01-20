require('../../utils/test');
const { deserializeLog } = require('./productLog');

describe.only('controllers/scheduler/productLog', () => {
  it('deserializeLog', () => {
    deserializeLog('6005 ["workspace","small.workspace.json"]')
      .should.eql({
        uid: '6005',
        args: ['workspace', 'small.workspace.json'],
      });
    deserializeLog('6005')
      .should.eql({
        uid: '6005',
      });
  });
});
