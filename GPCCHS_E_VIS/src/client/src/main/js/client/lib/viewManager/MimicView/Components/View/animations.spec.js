import {
  scaleAnimation,
  translateAnimation,
  rotateAnimation,
  textBoxAnimation,
  colourAnimation,
  showAnimation,
} from './animations';

describe('Mimic animations:scaleAnimation', () => {
  test('scaleAnimation - y', () => {
    const data = {
      values: { ep1: { value: 50 } },
    };
    const svgEl = {
      epName: 'ep1',
      domain: [0, 100],
      type: 'scaleY',
      el: { style: {} },
    };
    scaleAnimation(data, svgEl);
    expect(svgEl)
    .toEqual({
      epName: 'ep1',
      domain: [0, 100],
      type: 'scaleY',
      el: {
        style: {
          transform: 'scaleY(0.5)',
          transformOrigin: 'bottom',
        },
      },
    });
  });
});

describe('Mimic animations:translateAnimation', () => {
  test('translateAnimation - y', () => {
    const data = {
      values: { ep1: { value: 40 } },
    };
    const g = {
      epName: 'ep1',
      domain: [0, 100],
      type: 'translateY',
      width: 100,
      el: { style: {} },
    };
    translateAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      domain: [0, 100],
      type: 'translateY',
      width: 100,
      el: {
        style: {
          transform: 'translate(0px, 40px)',
        },
      },
    });
  });
});

describe('Mimic animations:rotateAnimation', () => {
  test('rotateAnimation', () => {
    const data = {
      values: { ep1: { value: 50 } },
    };
    const g = {
      epName: 'ep1',
      domain: [0, 100],
      center: [0, 0],
      type: 'translateY',
      angle: 90,
      el: { style: {} },
    };
    rotateAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      domain: [0, 100],
      center: [0, 0],
      type: 'translateY',
      angle: 90,
      el: {
        style: {
          transform: 'rotate(45deg)',
          transformOrigin: '0px 0px',
        },
      },
    });
  });
});

describe('Mimic animations:textBoxAnimation', () => {
  test('textBoxAnimation - textColorThresholds', () => {
    const data = {
      values: { ep1: { value: 30 } },
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorThresholds: ['20|#00F', '40|#daa520'],
      textColorRegex: [],
      bgColorLevels: [],
      el: {
        style: {},
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorThresholds: ['20|#00F', '40|#daa520'],
      textColorRegex: [],
      bgColorLevels: [],
      el: {
        style: {
          fill: '#00F',
        },
        innerHTML: 30,
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg({ fill: '', fillOpacity: 0 }),
    }));
  });

  test('textBoxAnimation - textColorRegex', () => {
    const data = {
      values: { ep1: { value: 'info' } },
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorRegex: ['info=#00F', 'warning=#daa520'],
      textColorThresholds: [],
      bgColorLevels: [],
      el: {
        style: {},
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);

    // JSON.stringify because instances cannot be compared one with another
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorRegex: ['info=#00F', 'warning=#daa520'],
      textColorThresholds: [],
      bgColorLevels: [],
      el: {
        style: {
          fill: '#00F',
        },
        innerHTML: 'info',
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg({ fill: '', fillOpacity: 0 }),
    }));
  });

  test('textBoxAnimation - bgColorLevels', () => {
    const data = {
      values: { ep1: { value: 30 } },
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorThresholds: [],
      textColorRegex: [],
      bgColorLevels: ['20$#00F', '40$#daa520'],
      el: {
        style: {},
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);

    // JSON.stringify because instances cannot be compared one with another
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorThresholds: [],
      textColorRegex: [],
      bgColorLevels: ['20$#00F', '40$#daa520'],
      el: {
        style: {
          fill: '#000',
        },
        innerHTML: 30,
        getBBox: () => ({ width: 100, height: 20, y: 20 }),
      },
      elBg: new Elbg({ fill: '#00F', fillOpacity: 1 }),
    }));
  });
});

describe('Mimic animations:colourAnimation', () => {
  test('colourAnimation', () => {
    const data = {
      values: { ep1: { value: 'info' } },
    };
    const g = {
      epName: 'ep1',
      operators: ['=$info$#00F', '=$warning$#daa520'],
      el: {
        childNodes: [
          { style: {} },
        ],
      },
    };
    colourAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      operators: ['=$info$#00F', '=$warning$#daa520'],
      el: {
        childNodes: [
          { style: { fill: '#00F' } },
        ],
      },
    });
  });
});

describe('Mimic animations:showAnimation', () => {
  test('show', () => {
    const data = {
      values: { ep1: { value: 'info' } },
    };
    const g = {
      epName: 'ep1',
      displayThresholds: ['=$info$show', '=$warning$hide'],
      displayRegex: [],
      el: {
        style: {},
      },
    };
    showAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      displayThresholds: ['=$info$show', '=$warning$hide'],
      displayRegex: [],
      el: {
        style: { visibility: 'visible' },
      },
    });
  });
});
