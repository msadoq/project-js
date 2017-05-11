import { should, sinon } from '../common/test';
import { simpleReadView } from './readView';
import * as io from './io';

const stubReadDocument = (doc = {}, type = 'TextView') => sinon.stub(io, 'readDocument').callsFake((viewInfo, cb) => {
  if (viewInfo.withError) {
    return cb(new Error('Fake Error'));
  }
  const content = {
    type,
    ...doc,
  };
  return cb(null, content, null, '/a/fake/absolute/path');
});

describe('documentManager:readView', () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });

  it('creates a simple view', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (err, content) => {
      content.should.be.eql({
        value: {
          uuid: 'fake-uuid',
          path: '/a/path',
          oId: 'an oid',
          type: 'TextView',
          defaultRatio: { length: 5, width: 5 },
          links: [],
          title: 'New Text View',
          configuration: { content: '', entryPoints: [] },
          isModified: false,
          absolutePath: '/a/fake/absolute/path',
        },
      });
      done();
    });
  });

  it('gives an error when view type is not supported', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'FakeView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (err, content) => {
      should.not.exist(err);
      content.error.should.be.an('error');
      done();
    });
  });
  it('gives an error when readDocument failed', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ withError: true }, (err, content) => {
      should.not.exist(err);
      content.error.should.be.an('error');
      done();
    });
  });
});
