const { should } = require('../utils/test');
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
    it('already existing key', (done) => {
      zmq.open({ myKey: { type: 'push', url, role: 'server' } }, () => {
        zmq.open({ myKey: { type: 'push', url, role: 'server' } }, (err) => {
          err.should.be.an('error')
            .with.property('message', 'A ZeroMQ socket is already opened with this key: myKey');
          done();
        });
      });
    });
    it('unsupported types', (done) => {
      zmq.open({ myKey: { type: 'unknown', role: 'server' } }, (err) => {
        err.should.be.an('error')
          .with.property('message', 'Unknown ZeroMQ socket type: unknown');
        done();
      });
    });
    it('handler required', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'server' } }, (err) => {
        err.should.be.an('error')
          .with.property('message', 'Handler function required for ZeroMQ socket type: pull');
        done();
      });
    });
    it('role required', (done) => {
      zmq.open({ myKey: { type: 'push' } }, (err) => {
        err.should.be.an('error')
          .with.property('message', 'Role must be client or server and is required');
        done();
      });
    });
  });
  describe('get', () => {
    it('exists', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        zmq.get('myKey', 'pull').should.be.an('object').with.property('type', 'pull');
        done();
      });
    });
    it('not exists', () => {
      (() => zmq.get('myKey', 'pull')).should.throw(Error);
    });
    it('incorect type', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        (() => zmq.get('myKey', 'push')).should.throw(Error);
        done();
      });
    });
  });
  describe('disallow wrong type', () => {
    it('call pull on push', (done) => {
      zmq.open({ myKey: { type: 'pull', role: 'client', url, handler: () => {} } }, () => {
        (() => zmq.push('myKey', new Buffer('string'))).should.throw(Error);
        done();
      });
    });
  });
  describe('push/pull', () => {
    const getHandler = (done) => {
      let n = 0;
      return (msg) => {
        msg.should.be.an.instanceof(Buffer);
        switch (n) {
          case 0:
            msg.toString().should.equal('foo');
            break;
          case 1:
            msg.toString().should.equal('bar');
            break;
          case 2:
            msg.toString().should.equal('baz');
            done();
            break;
          default:
            should.fail();
            break;
        }
        n += 1;
      };
    };
    it('successive messages', (done) => {
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
    it('pushes are spooled until a pull connect', (done) => {
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
    it('works', (done) => {
      const repHandler = (msg) => {
        msg.should.be.an.instanceof(Buffer);
        msg.toString().should.equal('hello');
        zmq.respond('myRep', 'world');
      };
      const reqHandler = (msg) => {
        msg.should.be.an.instanceof(Buffer);
        msg.toString().should.equal('world');
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
