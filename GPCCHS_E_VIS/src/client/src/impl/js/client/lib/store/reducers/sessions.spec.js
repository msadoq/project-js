import '../../common/test';
import * as actions from '../actions/sessions';
import reducer from './sessions';

describe('store:sessions:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.eql([]);
  });
  it('unknown action', () => {
    reducer([{
      name: 'Master',
      id: 0,
      timestamp: { ms: 1479210950713, ps: null },
      delta: 0,
    }], {}).should.eql([{
      name: 'Master',
      id: 0,
      timestamp: { ms: 1479210950713, ps: null },
      delta: 0,
    }]);
  });
  it('set state', () => {
    reducer(undefined, actions.updateSessions([{
      name: 'Master',
      id: 0,
      timestamp: { ms: 1479210950713, ps: null },
      delta: 0,
    }])).should.eql([{
      name: 'Master',
      id: 0,
      timestamp: { ms: 1479210950713, ps: null },
      delta: 0,
    }]);
  });
});
