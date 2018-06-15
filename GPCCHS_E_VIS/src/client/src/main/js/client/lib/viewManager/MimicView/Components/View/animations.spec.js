// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 25/08/2017 : Put MimicView animation methods appart, and test
//  each one of them (rotate, scale...).
// VERSION : 1.1.2 : DM : #6816 : 25/08/2017 : renamed methods of the mimic view animation tests.
// VERSION : 1.1.2 : DM : #6816 : 28/08/2017 : Added estlint-disable text justification for
//  MimicView's animations tests.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : MimicView : adapted tests to handle dom element
//  mocking, setAttribute and getAttribute mocked functions.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : Added default values to all MimicView's animations.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : imicView Fixed rotate animation error, set
//  visibility to visible.
// VERSION : 1.1.2 : DM : #6816 : 01/09/2017 : MimicView : renamed some attributes, no origin
//  attribute for translate animation, scale can go between x and x angles.
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// END-HISTORY
// ====================================================================

import {
  scaleAnimation,
  translateAnimation,
  rotateAnimation,
  textBoxAnimation,
  colourAnimation,
  showAnimation,
} from './animations';

// eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
const El = function (style, innerHTML, getBBox, childNodes) {
  this.setAttribute = (a, b) => {
    this[a] = b;
  };
  this.getAttribute = a => this[a];
  this.style = style || {};
  if (getBBox) {
    this.getBBox = getBBox;
  }
  if (innerHTML) {
    this.innerHTML = innerHTML;
  }
  if (childNodes) {
    this.childNodes = childNodes;
  }
};

describe('Mimic animations:scaleAnimation', () => {
  const svgEl = {
    epName: 'ep1',
    domain: [0, 100],
    scale: [0, 100],
    type: 'scaleY',
    defaultValue: 40,
    el: new El({}),
  };
  test('scaleAnimation - defaultValue', () => {
    const data = { values: {} };
    scaleAnimation(data, svgEl);
    expect(JSON.stringify(svgEl))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      scale: [0, 100],
      type: 'scaleY',
      defaultValue: 40,
      el: new El({
        transform: 'scaleY(0.4)',
        visibility: 'visible',
        transformOrigin: 'left top 0px',
      }),
    }));
  });
  test('scaleAnimation - y', () => {
    const data = {
      values: { ep1: { value: 50 } },
    };
    scaleAnimation(data, svgEl);
    expect(JSON.stringify(svgEl))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      scale: [0, 100],
      type: 'scaleY',
      defaultValue: 40,
      el: new El({
        transform: 'scaleY(0.5)',
        visibility: 'visible',
        transformOrigin: 'left top 0px',
      }),
    }));
  });
});

describe('Mimic animations:translateAnimation', () => {
  const g = {
    epName: 'ep1',
    domain: [0, 100],
    type: 'translateY',
    defaultValue: 30,
    distance: 100,
    el: new El({}),
  };
  test('translateAnimation - defaultValue', () => {
    const data = { values: {} };
    translateAnimation(data, g);
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      type: 'translateY',
      defaultValue: 30,
      distance: 100,
      el: new El({
        transform: 'translate(0px, 30px)',
      }),
    }));
  });
  test('translateAnimation - y', () => {
    const data = {
      values: { ep1: { value: 40 } },
    };
    translateAnimation(data, g);
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      type: 'translateY',
      defaultValue: 30,
      distance: 100,
      el: new El({
        transform: 'translate(0px, 40px)',
      }),
    }));
  });
});

describe('Mimic animations:rotateAnimation', () => {
  const g = {
    epName: 'ep1',
    domain: [0, 100],
    center: [0, 0],
    type: 'translateY',
    defaultValue: 10,
    angle: [0, 90],
    origin: 'center center',
    el: new El({}),
  };
  test('rotateAnimation - defaultValue', () => {
    const data = { values: {} };
    rotateAnimation(data, g);
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      center: [0, 0],
      type: 'translateY',
      defaultValue: 10,
      angle: [0, 90],
      origin: 'center center',
      el: new El({
        transform: 'rotate(9deg)',
        visibility: 'visible',
        transformOrigin: 'center center 0px',
      }),
    }));
  });
  test('rotateAnimation', () => {
    const data = {
      values: { ep1: { value: 50 } },
    };
    rotateAnimation(data, g);
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      domain: [0, 100],
      center: [0, 0],
      type: 'translateY',
      defaultValue: 10,
      angle: [0, 90],
      origin: 'center center',
      el: new El({
        transform: 'rotate(45deg)',
        visibility: 'visible',
        transformOrigin: 'center center 0px',
      }),
    }));
  });
});

describe('Mimic animations:textBoxAnimation', () => {
  test('textBoxAnimation - textColorOperators - defaultValue', () => {
    const data = {
      values: {},
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.getAttribute = a => this[a];
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      defaultValue: ['#FAF', '#FFA', 'error'],
      textColorOperators: ['>|20|#00F', '>|40|#daa520'],
      textColorRegex: [],
      bgColorLevels: [],
      el: new El(
        {},
        null,
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);
    expect(JSON.stringify(g))
    .toEqual(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      defaultValue: ['#FAF', '#FFA', 'error'],
      textColorOperators: ['>|20|#00F', '>|40|#daa520'],
      textColorRegex: [],
      bgColorLevels: [],
      el: new El(
        {
          fill: '#FAF',
          visibility: 'visible',
        },
        'error',
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg({ fill: '#FFA' }),
    }));
  });
  test('textBoxAnimation - textColorOperators', () => {
    const data = {
      values: { ep1: { value: 30 } },
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.getAttribute = a => this[a];
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorOperators: ['>|20|#00F', '>|40|#daa520'],
      textColorRegex: [],
      bgColorOperators: [],
      bgColorRegex: [],
      el: new El(
        {},
        null,
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);
    expect(JSON.stringify(g))
    .toEqual(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorOperators: ['>|20|#00F', '>|40|#daa520'],
      textColorRegex: [],
      bgColorOperators: [],
      bgColorRegex: [],
      el: new El(
        {
          fill: '#00F',
          visibility: 'visible',
        },
        30,
        () => ({ width: 100, height: 20, y: 20 })
      ),
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
      this.getAttribute = a => this[a];
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorRegex: ['info=#00F', 'warning=#daa520'],
      textColorOperators: [],
      bgColorOperators: [],
      bgColorRegex: [],
      el: new El(
        { visibility: 'visible' },
        null,
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);

    // JSON.stringify because instances cannot be compared one with another
    expect(JSON.stringify(g))
    .toBe(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorRegex: ['info=#00F', 'warning=#daa520'],
      textColorOperators: [],
      bgColorOperators: [],
      bgColorRegex: [],
      el: new El(
        {
          visibility: 'visible',
          fill: '#00F',
        },
        'info',
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg({ fill: '', fillOpacity: 0 }),
    }));
  });

  test('textBoxAnimation - bgColorOperators', () => {
    const data = {
      values: { ep1: { value: 30 } },
    };
    // eslint-disable-next-line func-names, "DV6 TBC_CNES Function to mock dom element"
    const Elbg = function (style) {
      this.setAttribute = (a, b) => {
        this[a] = b;
      };
      this.getAttribute = a => this[a];
      this.style = style || {};
      this.height = 20;
      this.width = 100;
      this.y = 20;
    };

    const g = {
      epName: 'ep1',
      type: 'textBox',
      textColorOperators: [],
      textColorRegex: [],
      bgColorOperators: ['>|20|#00F', '>|40|#daa520'],
      bgColorRegex: [],
      el: new El(
        { visibility: 'visible' },
        null,
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg(),
    };

    textBoxAnimation(data, g);

    // JSON.stringify because instances cannot be compared one with another
    expect(JSON.stringify(g))
    .toEqual(JSON.stringify({
      epName: 'ep1',
      type: 'textBox',
      textColorOperators: [],
      textColorRegex: [],
      bgColorOperators: ['>|20|#00F', '>|40|#daa520'],
      bgColorRegex: [],
      el: new El(
        {
          visibility: 'visible',
          fill: '#000',
        },
        30,
        () => ({ width: 100, height: 20, y: 20 })
      ),
      elBg: new Elbg({ fill: '#00F', fillOpacity: 1 }),
    }));
  });
});

describe('Mimic animations:colourAnimation', () => {
  const g = {
    epName: 'ep1',
    colorRegex: ['info=#00F', 'warning=#daa520'],
    colorOperators: [],
    defaultValue: '#FAF',
    el: new El(
      {},
      null,
      null,
      [new El({})]
    ),
  };
  test('colourAnimation - defaultValue', () => {
    const data = { values: {} };
    colourAnimation(data, g);
    expect(JSON.stringify(g))
    .toEqual(JSON.stringify({
      epName: 'ep1',
      colorRegex: ['info=#00F', 'warning=#daa520'],
      colorOperators: [],
      defaultValue: '#FAF',
      el: new El(
        { visibility: 'visible' },
        null,
        null,
        [new El({ fill: '#FAF' })]
      ),
    }));
  });
  test('colourAnimation', () => {
    const data = {
      values: { ep1: { value: 'info' } },
    };
    colourAnimation(data, g);
    expect(JSON.stringify(g))
    .toEqual(JSON.stringify({
      epName: 'ep1',
      colorRegex: ['info=#00F', 'warning=#daa520'],
      colorOperators: [],
      defaultValue: '#FAF',
      el: new El(
        { visibility: 'visible' },
        null,
        null,
        [new El({ fill: '#00F' })]
      ),
    }));
  });
});

describe('Mimic animations:showAnimation', () => {
  const g = {
    epName: 'ep1',
    displayOperators: [],
    displayRegex: ['info=show', 'warning=hidden'],
    el: {
      style: {},
    },
  };
  test('show - defaultValue', () => {
    const data = { values: {} };
    showAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      displayOperators: [],
      displayRegex: ['info=show', 'warning=hidden'],
      el: {
        style: { visibility: 'hidden' },
      },
    });
  });
  test('show', () => {
    const data = {
      values: { ep1: { value: 'info' } },
    };
    showAnimation(data, g);
    expect(g)
    .toEqual({
      epName: 'ep1',
      displayOperators: [],
      displayRegex: ['info=show', 'warning=hidden'],
      el: {
        style: { visibility: 'visible' },
      },
    });
  });
});
