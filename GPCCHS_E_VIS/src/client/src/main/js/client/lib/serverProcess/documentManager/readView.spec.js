// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
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

  test('creates a simple view using readed document', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (err, content) => {
      expect(err).toBeFalsy();
      expect(content).toMatchSnapshot();
      done();
    });
  });

  test('creates a simple view with random uuid', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ path: '/a/path', oId: 'an oid' }, (err, content) => {
      expect(err).toBeFalsy();
      const contentWithoutUuid = _.unset('value.uuid', content);
      expect(contentWithoutUuid).toMatchSnapshot();
      expect(content.value.uuid).toBeAnUuid();
      done();
    });
  });

  test('gives an error when validation fails', (done) => {
    stub = stubReadDocument({}, 'TextView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (unused, { error }) => {
      expect(error).toBeInstanceOf(Error);
      done();
    });
  });
  test('gives an error when view type is not supported', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'FakeView');
    simpleReadView({ uuid: 'fake-uuid', path: '/a/path', oId: 'an oid' }, (err, content) => {
      expect(err).toBeFalsy();
      expect(content.error).toBeInstanceOf(Error);
      done();
    });
  });
  test('gives an error when readDocument failed', (done) => {
    stub = stubReadDocument({ entryPoints: [], content: '' }, 'TextView');
    simpleReadView({ withError: true }, (err, content) => {
      expect(err).toBeFalsy();
      expect(content.error).toBeInstanceOf(Error);
      done();
    });
  });
});
