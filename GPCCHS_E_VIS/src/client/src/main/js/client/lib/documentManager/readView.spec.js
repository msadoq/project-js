import sinon from 'sinon';
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

  it('creates a simple view using readed document', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (err, content) => {
      expect(err).toBeFalsy();
      expect(content).toEqual({
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
      expect(err).toBeFalsy();
      expect(content.error).toBeInstanceOf(Error);
      done();
    });
  });
  it('gives an error when readDocument failed', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ withError: true }, (err, content) => {
      expect(err).toBeFalsy();
      expect(content.error).toBeInstanceOf(Error);
      done();
    });
  });
});
