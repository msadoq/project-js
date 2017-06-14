/* eslint no-underscore-dangle: 0 */

import { computeCursors, nextCurrent } from './play';

describe('mainProcess/play', () => {
  describe('nextCurrent', () => {
    it('computes next current timestamp', () => {
      expect(nextCurrent(0, 10, 10)).toEqual(100);
    });
  });
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
          upper: 1420106700500, // visuWindow.upper + 500
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

      expect(res.visuWindow).toHaveProperty('lower', vw.lower);
      expect(res.visuWindow).toHaveProperty('upper', vw.upper);
      expect(res.slideWindow).toHaveProperty('lower', (vw.lower + newCurrent) / 2);
      expect(res.slideWindow).toHaveProperty('upper', (vw.current + vw.upper + offset) / 2);
    });

    it('(Normal mode) -     should move 377ms and move slideWindow', () => {
      const offset = 377;
      const newCurrent = vw.upper + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Normal', currentUpperMargin);

      expect(res.visuWindow).toHaveProperty('lower', vw.lower + offset);
      expect(res.visuWindow).toHaveProperty('upper', newCurrent);
      expect(res.slideWindow).toHaveProperty('lower', (vw.lower + offset + newCurrent) / 2);
      expect(res.slideWindow).toHaveProperty('upper', (newCurrent + vw.upper + offset) / 2);
    });

    it('(Normal mode) -     should move 106,100,000ms and move slideWindow', () => {
      const offset = 106100000;
      const newCurrent = vw.upper + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Normal', currentUpperMargin);

      expect(res.visuWindow).toHaveProperty('lower', vw.lower + offset);
      expect(res.visuWindow).toHaveProperty('upper', newCurrent);
      expect(res.slideWindow).toHaveProperty('lower', (vw.lower + offset + newCurrent) / 2);
      expect(res.slideWindow).toHaveProperty('upper', (newCurrent + vw.upper + offset) / 2);
    });

    it('(Extensible mode) - should move 377ms and then 380ms', () => {
      const offset = 377;
      const secondOffset = 380;
      let newCurrent = vw.upper + offset;
      let res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Extensible', currentUpperMargin);

      expect(res.visuWindow).toHaveProperty('lower', vw.lower);
      expect(res.visuWindow).toHaveProperty('upper', newCurrent);
      expect(res.slideWindow).toHaveProperty('lower', (vw.lower + newCurrent) / 2);
      expect(res.slideWindow).toHaveProperty('upper', sw.upper);

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

      expect(res.visuWindow).toHaveProperty('lower', vw.lower + secondOffset);
      expect(res.visuWindow).toHaveProperty('upper', newCurrent);
      expect(res.slideWindow).toHaveProperty('lower', (vw.lower + secondOffset + newCurrent) / 2);
      expect(res.slideWindow).toHaveProperty('upper', newCurrent);
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

      expect(res.visuWindow).toHaveProperty('lower', vw.lower);
      expect(res.visuWindow).toHaveProperty('upper', vw.upper);
      expect(res.slideWindow).toHaveProperty('lower', sw.lower);
      expect(res.slideWindow).toHaveProperty('upper', sw.upper);

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

      expect(res.visuWindow).toHaveProperty('lower', vw.lower + ((offset + secondOffset) - 500));
      expect(res.visuWindow).toHaveProperty('upper', vw.upper + ((offset + secondOffset) - 500));
      expect(res.slideWindow).toHaveProperty('lower', sw.lower + ((offset + secondOffset) - 500));
      expect(res.slideWindow).toHaveProperty('upper', sw.upper + ((offset + secondOffset) - 500));
    });
    it('(Fixed mode) - should only move visuWindow', () => {
      const offset = 377;
      sw = {
        lower: vw.current - 500,
        upper: vw.upper + 500,
      };
      const newCurrent = vw.current + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'Fixed', currentUpperMargin);

      expect(res).toEqual({
        visuWindow: {
          current: 1420106500377,
          lower: 1420106400000,
          upper: 1420106700000,
        },
        slideWindow: { lower: 1420106499500, upper: 1420106700500 },
      });
    });
    it('(Unknown mode) - should only move visuWindow', () => {
      const offset = 377;
      sw = {
        lower: vw.current - 500,
        upper: vw.upper + 500,
      };
      const newCurrent = vw.current + offset;
      const res = computeCursors(newCurrent, vw.lower, vw.upper, sw.lower, sw.upper,
        'UnknownMode', currentUpperMargin);

      expect(res).toEqual({
        visuWindow: {
          current: 1420106500377,
          lower: 1420106400000,
          upper: 1420106700000,
        },
        slideWindow: { lower: 1420106499500, upper: 1420106700500 },
      });
    });
  });
});
