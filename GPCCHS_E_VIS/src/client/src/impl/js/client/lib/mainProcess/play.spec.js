/* eslint no-underscore-dangle: 0 */

import compute from './play';

require('../common/test');

describe('mainProcess/play', () => {
  describe('compute', () => {
    const currentUpperMargin = 0;
    let timebarData;
    let vw;
    let sw;
    let v;
    beforeEach(() => {
      timebarData = {
        visuWindow: {
          lower: 1420106400000,
          upper: 1420106700000,
          current: 1420106500000,
        },
        slideWindow: {
          lower: 1420106430000,
          upper: 1420106700500 // visuWindow.upper + 500
        },
        viewport: {
          lower: 1420106100000,
          upper: 1420107181125
        }
      };
      vw = timebarData.visuWindow;
      sw = timebarData.slideWindow;
      v = timebarData.viewport;
    });
    it('(Normal mode) -     should move 377ms', () => {
      const offset = 377;
      const newCurrent = timebarData.visuWindow.current + offset;
      const res = compute(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        v.lower, v.upper, 'Normal', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower,
        vw.upper,
        sw.lower,
        sw.upper,
      ]);
    });

    it('(Normal mode) -     should move 377ms and move slideWindow', () => {
      const offset = 377;
      const newCurrent = vw.upper + offset;
      const res = compute(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        v.lower, v.upper, 'Normal', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower + offset,
        newCurrent,
        sw.lower + offset,
        sw.upper + offset,
      ]);
    });

    it('(Normal mode) -     should move 106100000ms and  move slideWindow / viewport', () => {
      const offset = 106100000;
      const newCurrent = vw.upper + offset;
      const res = compute(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        v.lower, v.upper, 'Normal', currentUpperMargin);

      res.should.eql([
        vw.lower + offset,
        newCurrent,
        sw.lower + offset,
        sw.upper + offset,
        res[0] - ((res[1] - res[0]) * 2),
        res[1] + ((res[1] - res[0]) / 5)
      ]);
    });

    it('(Extensible mode) - should move 377ms and then 380ms', () => {
      const offset = 377;
      const secondOffset = 380;
      let newCurrent = vw.upper + offset;
      let res = compute(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        v.lower, v.upper, 'Extensible', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower,
        newCurrent,
        sw.lower + offset,
        sw.upper,
      ]);

      newCurrent += secondOffset;
      res = compute(newCurrent, res[0], res[1], res[2], res[3],
        v.lower, v.upper, 'Extensible', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower + secondOffset,
        newCurrent,
        sw.lower + offset + secondOffset,
        newCurrent
      ]);
    });
    it('(Fixed mode) -      should move 377ms and then 380ms', () => {
      const offset = 377;
      const secondOffset = 380;
      sw = {
        lower: vw.current - 500,
        upper: vw.current + 500,
      };
      let newCurrent = vw.current + offset;
      let res = compute(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        v.lower, v.upper, 'Fixed', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower,
        vw.upper,
        sw.lower,
        sw.upper,
      ]);

      newCurrent += secondOffset;
      res = compute(newCurrent, res[0], res[1], res[2], res[3],
        v.lower, v.upper, 'Fixed', currentUpperMargin);

      res.slice(0, 4).should.eql([
        vw.lower + ((offset + secondOffset) - 500),
        vw.upper + ((offset + secondOffset) - 500),
        sw.lower + ((offset + secondOffset) - 500),
        sw.upper + ((offset + secondOffset) - 500),
      ]);
    });
  });
});
