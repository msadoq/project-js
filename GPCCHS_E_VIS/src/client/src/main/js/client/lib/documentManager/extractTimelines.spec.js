import _ from 'lodash';
import extractTimelines from './extractTimelines';
import extractTimebars from './extractTimebars';
import { should } from '../common/test';

describe('documents/lib', () => {
  describe('extractTimelines', () => {
    let content;
    beforeEach(() => {
      content = {
        timebars: [{
          type: 'timeBarConfiguration',
          id: 'Timebar 1',
          timelines: [
            {
              id: 'Session 1',
              offset: 0,
              kind: 'Session',
              sessionId: 100
            }
          ],
          masterId: 'Session 1',
          visuWindow: {
            lower: 1480578427000,
            upper: 1480578527000,
            current: 1480578457000,
            defaultWidth: 900000
          },
          slideWindow: {
            lower: 1480578437000,
            upper: 1480582037000
          },
          extUpperBound: 1480582047000,
          rulerStart: 1480577807000,
          rulerResolution: 11630,
          speed: 1,
          mode: 'Normal',
        },
        {
          type: 'timeBarConfiguration',
          id: 'Timebar 2',
          timelines: [
            {
              id: 'Session 2',
              offset: -3600000,
              kind: 'Session',
              sessionId: 100
            },
          ],
          masterId: 'Session 2',
          visuWindow: {
            lower: 1480578427000,
            upper: 1480578527000,
            current: 1480578457000,
            defaultWidth: 900000
          },
          slideWindow: {
            lower: 1480578437000,
            upper: 1480582037000
          },
          extUpperBound: 1480582047000,
          rulerStart: 1480577807000,
          rulerResolution: 11630,
          speed: 1,
          mode: 'Normal',
        }],
      };
      content = Object.assign({}, { __original: content, __folder: '.' });
      extractTimebars(content, (err, val) => {
        content = val;
      });
    });
    it('workspace valid', () => {
      extractTimelines(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars', 'timelines');
        val.timelines.should.be.an('object');
        Object.keys(val.timelines).should.have.length(2);
        _.each(val.timebars, (tb) => {
          tb.timelines.should.be.an('array');
          _.each(tb.timelines, (tlId) => {
            const tl = val.timelines[tlId];
            tl.should.be.an('object').with.keys('id', 'offset', 'kind', 'sessionId', 'uuid');
          });
        });
      });
    });
    it('timelines not array', () => {
      const uuid = Object.getOwnPropertyNames(content.timebars);
      content.timebars[uuid[0]].timelines = { val: 'wrong' };
      extractTimelines(content, (err) => {
        should.exist(err);
        err.should.be.an('array');
      });
    });
    it('no timelines', () => {
      const uuid = Object.getOwnPropertyNames(content.timebars);
      content.timebars[uuid[0]].timelines = [];
      extractTimelines(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars', 'timelines');
        val.timelines.should.be.an('object');
        Object.keys(val.timelines).should.have.length(1);
      });
    });
  });
});
