const extractTimelines = require('./extractTimelines');
const extractTimebars = require('./extractTimebars');
const { should } = require('../common/test');
const _ = require('lodash');

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
        }],
      };
      content = Object.assign({}, { __original: content, __folder: '.' });
      extractTimebars(content, (err, val) => { content = val; });
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
            should.exist(val.timelines[tlId]);
          });
        });
      });
    });
    it('timelines not array', () => {
      const uuid = Object.getOwnPropertyNames(content.timebars);
      content.timebars[uuid[0]].timelines = { val: 'wrong' };
      extractTimelines(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars', 'timelines');
        val.timebars.should.be.an('object');
        Object.keys(val.timelines).should.have.length(1);
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
