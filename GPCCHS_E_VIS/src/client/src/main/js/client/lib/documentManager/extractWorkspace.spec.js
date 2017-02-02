// import path from 'path';
import { compose, prop, split, mapValues, keys, each } from 'lodash/fp';

import { should, expect } from '../common/test';
import fmdApi from '../common/fmd';
import ExtractWorkspace from './extractWorkspace';
import { applyDependencyToApi } from '../common/utils';

const getPathFromOid = compose(prop(1), split(':'));
const mockFmdApi = fmd => ({
  ...fmd,
  resolveDocument: (oid, cb) => cb(null, getPathFromOid(oid)),
});

const { readWorkspace } = applyDependencyToApi(ExtractWorkspace, mockFmdApi(fmdApi));

describe('documents/workspace', () => {
  const rootDir = fmdApi.getRootDir();
  describe('readWorkspace', () => {
    it('exists', () => {
      readWorkspace.should.be.a('function');
    });
    it('valid workspace', (done) => {
      const assertAllIsString = each(each(x => x.should.be.a('string')));
      readWorkspace(rootDir, 'small.workspace.json', (err, res) => {
        setImmediate(() => {
          const workspace = mapValues(keys, res);
          expect(err).not.be.an('error');
          should.exist(workspace);
          workspace.should.be.an('object').with.keys('timebars', 'timelines', 'windows', 'pages', 'views');
          workspace.timebars.should.have.length(1);
          workspace.timelines.should.have.length(1);
          workspace.windows.should.have.length(1);
          workspace.pages.should.have.length(2);
          workspace.views.should.have.length(4);
          assertAllIsString(workspace);
          done();
        });
      });
    });
    it('invalid workspace', (done) => {
      readWorkspace(rootDir, 'pages/page1.json', (err, res) => {
        err.should.be.an('error');
        should.not.exist(res);
        done();
      });
    });
    it('unknown workspace', (done) => {
      readWorkspace(rootDir, 'unknown.workspace.json', (err, res) => {
        err.should.be.an('error');
        should.not.exist(res);
        done();
      });
    });
  });
});
