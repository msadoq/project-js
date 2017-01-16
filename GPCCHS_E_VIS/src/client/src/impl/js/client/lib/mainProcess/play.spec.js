/* eslint no-underscore-dangle: 0 */

import { computeCursors } from './play';

require('../common/test');

describe('mainProcess/play', () => {
  describe('computeCursors', () => {
    const currentUpperMargin = 0;
    let timebarData;
    let vw;
    let sw;
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
      };
      vw = timebarData.visuWindow;
      sw = timebarData.slideWindow;
    });
    it('(Normal mode) -     should move 377ms', () => {
      const offset = 377;
      const newCurrent = timebarData.visuWindow.current + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Normal', currentUpperMargin);

      res.visuWindow.should.have.property('lower', vw.lower);
      res.visuWindow.should.have.property('upper', vw.upper);
      res.slideWindow.should.have.property('lower', (vw.lower + newCurrent) / 2);
      res.slideWindow.should.have.property('upper', (vw.current + vw.upper + offset) / 2);
    });

    it('(Normal mode) -     should move 377ms and move slideWindow', () => {
      const offset = 377;
      const newCurrent = vw.upper + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Normal', currentUpperMargin);

      res.visuWindow.should.have.property('lower', vw.lower + offset);
      res.visuWindow.should.have.property('upper', newCurrent);
      res.slideWindow.should.have.property('lower', (vw.lower + offset + newCurrent) / 2);
      res.slideWindow.should.have.property('upper', (newCurrent + vw.upper + offset) / 2);
    });

    it('(Normal mode) -     should move 106,100,000ms and move slideWindow', () => {
      const offset = 106100000;
      const newCurrent = vw.upper + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Normal', currentUpperMargin);

      res.visuWindow.should.have.property('lower', vw.lower + offset);
      res.visuWindow.should.have.property('upper', newCurrent);
      res.slideWindow.should.have.property('lower', (vw.lower + offset + newCurrent) / 2);
      res.slideWindow.should.have.property('upper', (newCurrent + vw.upper + offset) / 2);
    });

    it('(Extensible mode) - should move 377ms and then 380ms', () => {
      const offset = 377;
      const secondOffset = 380;
      let newCurrent = vw.upper + offset;
      let res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Extensible', currentUpperMargin);

      res.visuWindow.should.have.property('lower', vw.lower);
      res.visuWindow.should.have.property('upper', newCurrent);
      res.slideWindow.should.have.property('lower', (vw.lower + newCurrent) / 2);
      res.slideWindow.should.have.property('upper', sw.upper);

      newCurrent += secondOffset;
      res = computeCursors(
        newCurrent,
        res.visuWindow.lower,
        res.visuWindow.upper,
        res.slideWindow.lower,
        res.slideWindow.upper,
        'Extensible',
        currentUpperMargin
      );

      res.visuWindow.should.have.property('lower', vw.lower + secondOffset);
      res.visuWindow.should.have.property('upper', newCurrent);
      res.slideWindow.should.have.property('lower', (vw.lower + secondOffset + newCurrent) / 2);
      res.slideWindow.should.have.property('upper', newCurrent);
    });
    it('(Fixed mode) -      should move 377ms and then 380ms', () => {
      const offset = 377;
      const secondOffset = 380;
      sw = {
        lower: vw.current - 500,
        upper: vw.current + 500,
      };
      let newCurrent = vw.current + offset;
      let res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Fixed', currentUpperMargin);

      res.visuWindow.should.have.property('lower', vw.lower);
      res.visuWindow.should.have.property('upper', vw.upper);
      res.slideWindow.should.have.property('lower', sw.lower);
      res.slideWindow.should.have.property('upper', sw.upper);

      newCurrent += secondOffset;
      res = computeCursors(
        newCurrent,
        res.visuWindow.lower,
        res.visuWindow.upper,
        res.slideWindow.lower,
        res.slideWindow.upper,
        'Fixed',
        currentUpperMargin
      );

      res.visuWindow.should.have.property('lower', vw.lower + ((offset + secondOffset) - 500));
      res.visuWindow.should.have.property('upper', vw.upper + ((offset + secondOffset) - 500));
      res.slideWindow.should.have.property('lower', sw.lower + ((offset + secondOffset) - 500));
      res.slideWindow.should.have.property('upper', sw.upper + ((offset + secondOffset) - 500));
    });
  });
});
