import { scaleLinear } from 'd3-scale';
import { draw } from './CurrentCursorCanvas';

const _ = require('lodash');

describe('CurrentCursorCanvas :: draw', () => {
  const propsStub = {
    current: 1509986030848,
    divStyle: {
      height: 1000,
      left: 0,
      top: 0,
      width: 1000,
    },
    height: 1000,
    width: 1000,
    xAxesAt: 'bottom',
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 1000]),
  };
  const operations = [];
  const getContext = () => {
    const handler = {
      get: (target, property) => (...args) => operations.push(_.padEnd(property, 20) + args.join('|')),
      set: (target, property, value) => operations.push(_.padEnd(property, 20) + value),
    };
    return new Proxy({}, handler);
  };

  test('CurrentCursorCanvas :: draw :: nominal case', () => {
    const ctx = getContext();
    draw(
      ctx,
      propsStub.current,
      propsStub.xScale,
      propsStub.divStyle
    );
    expect(operations).toMatchSnapshot();
  });
});
