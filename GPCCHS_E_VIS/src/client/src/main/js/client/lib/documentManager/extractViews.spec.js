import { v4 } from 'uuid';
import _ from 'lodash';
import { compose, prop, split } from 'lodash/fp';
import path from 'path';
import fmdApi from '../common/fmd';
import ExtractViews from './extractViews';
import { should } from '../common/test';
import { applyDependencyToApi } from '../common/utils';


const getPathFromOid = compose(prop(1), split(':'));
const mockFmdApi = fmd => ({
  ...fmd,
  resolveDocument: (oid, cb) => cb(null, getPathFromOid(oid)),
});

const { extractViews, readViews } = applyDependencyToApi(ExtractViews, mockFmdApi(fmdApi));

describe('documentManager/extractViews', () => {
  let content;
  const id1 = v4();
  const id2 = v4();
  const folder = fmdApi.getRootDir();

  before(() => {
    const id = v4();

    content = { pages: {}, timebars: {} };
    content.pages[id1] = {
      type: 'Page',
      title: 'simple page1',
      views: [
        { oId: 'oid:/plot1.json' },
      ],
      path: 'page02.vipg',
      timebarId: 'TB1',
      uuid: id1,
      timebarUuid: id,
      absolutePath: path.join(folder, 'page01.json'),
    };
    content.pages[id2] = {
      type: 'Page',
      title: 'simple page2',
      views: [{ path: '../text1.json' }, { path: '../plot1.json' }],
      path: 'page02.vipg',
      timebarId: 'TB1',
      uuid: id1,
      timebarUuid: id,
      absolutePath: path.join(folder, 'pages', 'pageSmall_with_oid.json'),
    };
    content.__folder = path.join(__dirname, 'fixtures');
  });
  describe('readViews', () => {
    let views;
    beforeEach(() => {
      views = [{ path: path.join(folder, 'text1.json'), uuid: v4(), type: 'TextView' },
      { oId: 'oid:/plot1.json', uuid: v4(), type: 'PlotView' }];
    });
    it('valid', (done) => {
      readViews(views, (err, list) => {
        should.not.exist(err);
        list.should.be.an('array').with.length(2);
        list[0].type.should.equal('TextView');
        list[0].configuration.should.contains.keys('type', 'entryPoints', 'links', 'defaultRatio');
        list[0].should.have.properties({
          uuid: views[0].uuid,
          path: views[0].path,
          oId: views[0].oId,
        });
        list[1].type.should.equal('PlotView');
        list[1].configuration.should.contains.keys('type', 'entryPoints', 'links', 'defaultRatio');
        list[1].should.have.properties({
          uuid: views[1].uuid,
          path: views[1].path,
          oId: views[1].oId,
        });
        done();
      });
    });
    it('with invalid path', (done) => {
      views.push({ path: path.join(folder, 'unknown.json'), uuid: v4(), type: 'TextView' });
      readViews(views, (err) => {
        should.exist(err);
        done();
      });
    });
  });
  describe('extractViews', () => {
    it('valid', (done) => {
      extractViews(content, (err, val) => {
        should.not.exist(err);
        val.views.should.be.an('object');
        Object.getOwnPropertyNames(val.views).should.have.length(3);
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
    it('with invalid view', (done) => {
      content.pages[id1].views = [{ invalid: 'view' }];
      extractViews(content, (err) => {
        err.should.be.an('error');
        done();
      });
    });
  });
});
