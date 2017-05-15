/* eslint-disable no-unused-expressions */
import workspaceFixture from './fixtures/small.workspace.json';
import { should, sinon, isV4 } from '../common/test';
import { readWorkspacePagesAndViews } from './readWorkspace';
import * as io from './io';
import * as readPageApi from './readPage';

const createStubReadDocument = () => sinon.stub(io, 'readDocument').callsFake((workspaceInfo, cb) => {
  if (workspaceInfo.withError) {
    return cb(new Error('Fake Error'));
  }
  return cb(null, workspaceFixture, null, '/a/fake/absolute/path');
});

const createStubReadPagesAndViews = () => sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
  cb(null, { pages: [{ type: 'Page' }], views: [{ type: 'TextView' }, { type: 'PlotView' }, { type: 'DynamicView' }] });
});

describe('documentManager:readWorkspace', () => {
  let stubReadDocument;
  afterEach(() => {
    stubReadDocument.restore();
  });

  describe('readWorkspacePagesAndViews', () => {
    it('prepare a complete readed workspace', (done) => {
      const stubReadPagesAndViews = createStubReadPagesAndViews();
      stubReadDocument = createStubReadDocument();
      readWorkspacePagesAndViews({}, (err, workspace) => {
        workspace.type.should.be.eql('WorkSpace');
        workspace.absolutePath.should.be.eql('/a/fake/absolute/path');

        workspace.windows.should.have.length(1);
        workspace.timebars.should.have.length(1);
        workspace.timelines.should.have.length(1);
        workspace.pages.should.have.length(2);
        workspace.views.should.have.length(6);

        const win = workspace.windows[0];
        win.type.should.be.eql('documentWindow');
        win.pages.should.be.eql([]);
        win.title.should.be.eql('Development workspace');
        win.geometry.should.be.eql({ x: 114, y: 71, w: 1310, h: 800, kind: 'Absolute' });
        isV4(win.uuid).should.be.true;

        const tb = workspace.timebars[0];
        tb.id.should.be.eql('TB1');
        tb.rulerResolution.should.be.eql(1500);
        tb.speed.should.be.eql(1);
        tb.masterId.should.be.eql('Session 1');
        tb.mode.should.be.eql('Normal');
        tb.timelines.should.have.length(1);
        isV4(tb.timelines[0]).should.be.true;
        isV4(tb.uuid).should.be.true;

        const tl = workspace.timelines[0];
        tl.id.should.be.eql('Session 1');
        tl.offset.should.be.eql(0);
        tl.kind.should.be.eql('Session');
        tl.sessionName.should.be.eql('Master');
        isV4(tl.uuid).should.be.true;

        stubReadPagesAndViews.restore();
        done();
      });
    });
    it('gives an error when readDocument failed', (done) => {
      stubReadDocument = createStubReadDocument();
      readWorkspacePagesAndViews({ withError: true }, (err, workspace) => {
        should.not.exist(workspace);
        err.should.be.an('error');
        done();
      });
    });
  });
});
