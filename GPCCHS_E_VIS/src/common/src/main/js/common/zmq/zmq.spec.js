// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

const zmq = require('./');

describe('io/zmq', () => {
  afterEach((done) => {
    zmq.closeSockets();
    done();
  });

  // TODO DBRUGNE add specific port for unit test in .env
  const url = 'tcp://127.0.0.1:9929';

  const openCallback = (done, onConnect = () => {}) => (err) => {
    if (err) {
      return done(err);
    }

    return onConnect();
  };

  describe('open', () => {
    test('already existing key', (done) => {
      zmq.open({ myKey: { type: 'push', url, role: 'server' } }, () => {
        zmq.open({ myKey: { type: 'push', url, role: 'server' } }, (err) => {
          expect(err).toBeAnError();
          expect(err).toHaveProperty('message', 'A ZeroMQ socket is already opened with this key: myKey');
          done();
        });
      });
    });
    test('unsupported types', (done) => {
      zmq.open({ myKey: { type: 'unknown', role: 'server' } }, (err) => {
        expect(err).toBeAnError();
        expect(err).toHaveProperty('message', 'Unknown ZeroMQ socket type: unknown');
        done();
      });
    });
    test('handler required', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'server' } }, (err) => {
        expect(err).toBeAnError();
        expect(err).toHaveProperty('message', 'Handler function required for ZeroMQ socket type: pull');
        done();
      });
    });
    test('role required', (done) => {
      zmq.open({ myKey: { type: 'push' } }, (err) => {
        expect(err).toBeAnError();
        expect(err).toHaveProperty('message', 'Role must be client or server and is required');
        done();
      });
    });
  });
  describe('get', () => {
    test('exists', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        expect(zmq.get('myKey', 'pull')).toHaveProperty('type', 'pull');
        done();
      });
    });
    test('not exists', () => {
      expect(() => zmq.get('myKey', 'pull')).toThrow(Error);
    });
    test('incorect type', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        expect(() => zmq.get('myKey', 'push')).toThrow(Error);
        done();
      });
    });
  });
  describe('disallow wrong type', () => {
    test('call pull on push', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        expect(() => zmq.push('myKey', new Buffer('string'))).toThrow(Error);
        done();
      });
    });
  });
  describe('push/pull', () => {
    const getHandler = (done) => {
      let n = 0;
      return (msg) => {
        expect(msg).toBeInstanceOf(Buffer);
        switch (n) {
          case 0:
            expect(msg.toString()).toEqual('foo');
            break;
          case 1:
            expect(msg.toString()).toEqual('bar');
            break;
          case 2:
            expect(msg.toString()).toEqual('baz');
            done();
            break;
          default:
            // should.fail();
            expect(msg).toBeFalsy();
            break;
        }
        n += 1;
      };
    };
    test('successive messages', (done) => {
      zmq.open({
        // open order is important for inproc:// socket
        myPull: { type: 'pull', role: 'client', url, handler: getHandler(done) },
        myPush: { type: 'push', role: 'server', url },
      }, openCallback(done, () => {
        zmq.push('myPush', 'foo');
        zmq.push('myPush', 'bar');
        zmq.push('myPush', 'baz');
      }));
    });
    test('pushes are spooled until a pull connect', (done) => {
      // this test could only be done with tcp:// sockets
      // issue: https://github.com/JustinTulloss/zeromq.node/issues/544
      const tcp = 'tcp://127.0.0.1:45694';
      zmq.open({ myPush: { type: 'push', role: 'server', url: tcp } }, openCallback(done, () => {
        zmq.push('myPush', 'foo');
        zmq.push('myPush', 'bar');
        zmq.push('myPush', 'baz');

        // now open pull
        return zmq.open({
          myPull: { type: 'pull', role: 'client', url: tcp, handler: getHandler(done) },
        }, openCallback);
      }));
    });
  });
  describe('req/res', () => {
    test('works', (done) => {
      const repHandler = (msg) => {
        expect(msg).toBeInstanceOf(Buffer);
        expect(msg.toString()).toEqual('hello');
        zmq.respond('myRep', 'world');
      };
      const reqHandler = (msg) => {
        expect(msg).toBeInstanceOf(Buffer);
        expect(msg.toString()).toEqual('world');
        done();
      };
      zmq.open({
        // open order is important for inproc:// socket
        myReq: { type: 'req', role: 'server', url, handler: reqHandler },
        myRep: { type: 'rep', role: 'client', url, handler: repHandler },
      }, openCallback(done, () => {
        zmq.request('myReq', 'hello');
      }));
    });
  });
});
