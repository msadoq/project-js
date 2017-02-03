import { values } from 'lodash/fp';
import extractTimebars from './extractTimebars';
import { should } from '../common/test';

describe('documents', () => {
  describe('extractTimebars', () => {
    let content;
    beforeEach(() => {
      const originalContent = {
        timebars: [{
          type: 'timeBarConfiguration',
          id: 'Timebar 1',
          mode: 'Normal',
          visuWindow: {
            lower: 1420106400000,
            upper: 1420113600000,
            current: 1420110000000,
            defaultWidth: 7200000,
          },
          slideWindow: {
            lower: 1420108200000,
            upper: 1420111800000,
          },
          extUpperBound: 1420115400000,
          rulerStart: 1420106400000,
          rulerResolution: 11250,
          speed: 1.0,
          timeSpec: 'LocalTime',
          offsetFromUTC: 0,
          timelines: [
            {
              id: 'Session 1',
              offset: 0,
              kind: 'Session',
              sessionId: 100,
            },
            {
              id: 'Session 2',
              offset: -3600000,
              kind: 'Session',
              sessionId: 100,
            },
          ],
          masterId: 'Session 1',
        }],
      };
      content = { __original: originalContent, __folder: '.' };
    });
    it('workspace valid', () => {
      extractTimebars(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars');
        val.timebars.should.be.an('object');

        const timebars = values(val.timebars);
        timebars.should.have.length(1);

        content.__original.timebars[0].uuid = timebars[0].uuid;
        timebars[0].should.be.eql(content.__original.timebars[0]);
      });
    });
    it('invalid workspace', () => {
      content.__original.timebars = { val: 'wrong' };
      extractTimebars(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars');
        val.timebars.should.be.an('object');

        const timebars = values(val.timebars);
        timebars.should.have.length(0);
      });
    });
    it('no timebars', () => {
      content.__original.timebars = [];
      extractTimebars(content, (err, val) => {
        should.not.exist(err);
        val.should.be.an('object').with.keys('__original', '__folder', 'timebars');
        val.timebars.should.be.an('object');
        Object.keys(val.timebars).should.have.length(0);
      });
    });
  });
});
