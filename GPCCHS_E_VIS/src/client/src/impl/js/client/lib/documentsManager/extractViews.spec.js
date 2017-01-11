const { extractViews, readViews } = require('./extractViews');
const { should } = require('../common/test');
const { v4 } = require('node-uuid');
const _ = require('lodash');
const path = require('path');

// TODO aleal : flag is never tested, and with a global var you can have side effect through your
// tests
// eslint-disable-next-line no-unused-vars
let flag = false;
function requestPathFromOId() {
  flag = true;
}
describe('documentsManager/extractViews', () => {
  let content;
  const id1 = v4();
  const id2 = v4();
  const folder = process.env.FMD_ROOT_DIR;

  before(() => {
    const id = v4();

    content = { pages: {}, timebars: {} };
    content.pages[id1] = {
      type: 'Page',
      title: 'simple page1',
      views: [{ path: 'plot1.json' }],
      // oId: 'page02.vipg',
      path: 'page02.vipg',
      timeBarId: 'TB1',
      uuid: id1,
      timebarId: id,
      absolutePath: path.join(folder, 'page1.json'),
    };
    content.pages[id2] = {
      type: 'Page',
      title: 'simple page2',
      views: [{ path: '/text1.json' }, { invalid: '/plot1.json' }],
      // oId: 'page02.vipg',
      path: 'page02.vipg',
      timeBarId: 'TB1',
      uuid: id1,
      timebarId: id,
      absolutePath: path.join(folder, 'page2.json'),
    };
    content.__folder = path.join(__dirname, 'fixtures');
  });
  // describe('findPageViewsAndReplaceWithUuid', () => {
  //   it('valid', () => {
  //     const views = findPageViewsAndReplaceWithUuid(content.pages[id1]);
  //     views.should.be.an('array').with.length(1);
  //     const vId = Object.getOwnPropertyNames(content.pages[id1].views);
  //     should.exist(views[vId[0]]);
  //   });
  //   it('invalid view', () => {
  //     const views = findPageViewsAndReplaceWithUuid(content.pages[id2]);
  //     views.should.be.an('array').with.length(1);
  //     const vId = Object.getOwnPropertyNames(content.pages[id2].views);
  //     should.exist(views[vId[0]]);
  //   });
  // });
  describe('readViews', () => {
    let views;
    beforeEach(() => {
      views = [{ path: path.join(folder, 'text1.json'), uuid: v4(), type: 'TextView' },
      { path: path.join(folder, 'plot1.json'), uuid: v4(), type: 'PlotView' }];
    });
    it('valid', (done) => {
      readViews(views, requestPathFromOId, (err, list) => {
        should.not.exist(err);
        list.should.be.an('array').with.length(2);
        list[0].type.should.equal('TextView');
        list[1].type.should.equal('PlotView');
        list[0].should.contains.keys('uuid', 'path', 'oId');
        list[1].should.contains.keys('uuid', 'path', 'oId');
        done();
      });
    });
    it('with invalid path', (done) => {
      views.push({ path: path.join(folder, 'unknown.json'), uuid: v4(), type: 'TextView' });
      readViews(views, requestPathFromOId, (err) => {
        should.exist(err);
        done();
      });
    });
  });
  describe('extractViews', () => {
    it('valid', (done) => {
      extractViews(content, requestPathFromOId, (err, val) => {
        should.not.exist(err);

        val.views.should.be.an('object');
        Object.getOwnPropertyNames(val.views).should.have.length(2);
        _.each(val.pages[id1].views, (id) => {
          if (id.uuid) {
            should.exist(val.views[id.uuid]);
            val.views[id.uuid].configuration.entryPoints.forEach((ep) => {
              should.exist(val.views[id.uuid].configuration.axes[ep.connectedDataX.axisId]);
              should.exist(val.views[id.uuid].configuration.axes[ep.connectedDataY.axisId]);
            });
          }
        });
        _.each(val.pages[id2].views, (id) => {
          if (id.uuid) {
            should.exist(val.views[id.uuid]);
          }
        });
        done();
      });
    });
  });
});
