require('../../lib/utils/test');
const zmq = require('../../lib/io/zmq');

describe('io/zmq', () => {
  afterEach(done => {
    zmq.closeSockets();
    done();
  });

  // TODO : configure .open() configuration error
  // TODO : call push on req and inverse

  const url = 'inproc://foo';

  const openCallback = (done, onConnect = () => {}) => err => {
    if (err) {
      return done(err);
    }

    return onConnect();
  };

  describe('open', () => {
    it('already existing key', done => {
      zmq.open({ myKey: { type: 'push', url } }, () => {
        zmq.open({ myKey: { type: 'push', url } }, err => {
          err.should.be.an('error')
            .with.property('message', 'A ZeroMQ socket is already opened with this key: myKey');
          done();
        });
      });
    });
    it('unsupported types', done => {
      zmq.open({ myKey: { type: 'unknown' } }, err => {
        err.should.be.an('error')
          .with.property('message', 'Unknown ZeroMQ socket type: unknown');
        done();
      });
    });
    it('handler required', done => {
      zmq.open({ myKey: { type: 'pull' } }, err => {
        err.should.be.an('error')
          .with.property('message', 'Handler function required for ZeroMQ socket type: pull');
        done();
      });
    });
  });
  describe('get', () => {
    it('exists', done => {
      zmq.open({ myKey: { type: 'pull', url, handler: () => {} } }, () => {
        zmq.get('myKey', 'pull').should.be.an('object').with.property('type', 'pull');
        done();
      });
    });
    it('not exists', () => {
      (() => zmq.get('myKey', 'pull')).should.throw(Error);
    });
    it('incorect type', done => {
      zmq.open({ myKey: { type: 'pull', url, handler: () => {} } }, () => {
        (() => zmq.get('myKey', 'push')).should.throw(Error);
        done();
      });
    });
  });
  describe('push/pull', () => {
    const getHandler = done => {
      let n = 0;
      return msg => {
        msg.should.be.an.instanceof(Buffer);
        switch (n++) { // eslint-disable-line default-case
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
        }
      };
    };
    it('successive messages', done => {
      zmq.open({
        // open order is important for inproc:// socket
        myPull: { type: 'pull', url, handler: getHandler(done) },
        myPush: { type: 'push', url },
      }, openCallback(done, () => {
        zmq.push('myPush', 'foo');
        zmq.push('myPush', 'bar');
        zmq.push('myPush', 'baz');
      }));
    });
    it('pushes are spooled until a pull connect', done => {
      // this test could only be done with tcp:// sockets
      // issue: https://github.com/JustinTulloss/zeromq.node/issues/544
      const tcp = 'tcp://127.0.0.1:45694';
      zmq.open({ myPush: { type: 'push', url: tcp } }, openCallback(done, () => {
        zmq.push('myPush', 'foo');
        zmq.push('myPush', 'bar');
        zmq.push('myPush', 'baz');

        // now open pull
        return zmq.open({
          myPull: { type: 'pull', url: tcp, handler: getHandler(done) },
        }, openCallback);
      }));
    });
  });
  describe('req/res', () => {
    it('works', done => {
      const repHandler = msg => {
        msg.should.be.an.instanceof(Buffer);
        msg.toString().should.equal('hello');
        zmq.respond('myRep', 'world');
      };
      const reqHandler = msg => {
        msg.should.be.an.instanceof(Buffer);
        msg.toString().should.equal('world');
        done();
      };
      zmq.open({
        // open order is important for inproc:// socket
        myReq: { type: 'req', url, handler: reqHandler },
        myRep: { type: 'rep', url, handler: repHandler },
      }, openCallback(done, () => {
        zmq.request('myReq', 'hello');
      }));
    });
  });
});
