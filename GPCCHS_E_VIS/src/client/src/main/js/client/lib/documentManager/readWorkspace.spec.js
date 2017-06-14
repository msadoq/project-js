import sinon from 'sinon';
import workspaceFixture from './fixtures/small.workspace.json';
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
    test('prepare a complete readed workspace', (done) => {
      const stubReadPagesAndViews = createStubReadPagesAndViews();
      stubReadDocument = createStubReadDocument();
      readWorkspacePagesAndViews({}, (err, workspace) => {
        expect(workspace.type).toEqual('WorkSpace');
        expect(workspace.absolutePath).toEqual('/a/fake/absolute/path');

        expect(workspace.windows).toHaveLength(1);
        expect(workspace.timebars).toHaveLength(1);
        expect(workspace.timelines).toHaveLength(1);
        expect(workspace.pages).toHaveLength(2);
        expect(workspace.views).toHaveLength(6);

        const win = workspace.windows[0];
        expect(win.type).toEqual('documentWindow');
        expect(win.pages).toEqual([]);
        expect(win.title).toEqual('Development workspace');
        expect(win.geometry).toEqual({ x: 114, y: 71, w: 1310, h: 800, kind: 'Absolute' });
        expect(win.uuid).toBeAnUuid();

        const tb = workspace.timebars[0];
        expect(tb.id).toEqual('TB1');
        expect(tb.rulerResolution).toEqual(1500);
        expect(tb.speed).toEqual(1);
        expect(tb.masterId).toEqual('Session 1');
        expect(tb.mode).toEqual('Normal');
        expect(tb.timelines).toHaveLength(1);
        expect(tb.timelines[0]).toBeAnUuid();
        expect(tb.uuid).toBeAnUuid();

        const tl = workspace.timelines[0];
        expect(tl.id).toEqual('Session 1');
        expect(tl.offset).toEqual(0);
        expect(tl.kind).toEqual('Session');
        expect(tl.sessionName).toEqual('Master');
        expect(tl.uuid).toBeAnUuid();

        stubReadPagesAndViews.restore();
        done();
      });
    });
    test('gives an error when readDocument failed', (done) => {
      stubReadDocument = createStubReadDocument();
      readWorkspacePagesAndViews({ withError: true }, (err, workspace) => {
        expect(workspace).toBeFalsy();
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
