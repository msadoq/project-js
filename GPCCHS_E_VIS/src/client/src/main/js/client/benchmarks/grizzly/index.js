import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import GrizzlyChart from '../../lib/viewManager/PlotView/Components/View/GrizzlyParametric/Chart';
import {
  data1000Points, data1000Points2, data10000Points,
  data10000Points2, data25000Points, data25000Points2,
  data10000PointsColorChanging, data10000Points4Colors,
} from './data';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';

process.title = 'gpcchs_grizzly_dev';

const SET_GRIZZLY_PROPS = 'SET_GRIZZLY_PROPS';

const propsStub = {
  additionalStyle: {
    display:"block"
  },
  allowLasso: true,
  allowPan: true,
  allowXPan: true,
  allowXZoom: true,
  allowYPan: true,
  allowYZoom: true,
  allowZoom: true,
  current: 10000,
  enableTooltip: true,
  height: 500,
  lines:[],
  parametric: false,
  perfOutput: true,
  tooltipColor: 'white',
  width: 1000,
  xAxes: [],
  xAxesAt: 'bottom',
  xAxisAt: 'bottom',
  yAxes: [],
  yAxesAt: 'left',
  linesListener: console.log,
};

const xAxis = {
  autoLimits:false,
  autoTick:true,
  format:".2f",
  formatAsDate:true,
  gridSize:1,
  gridStyle:"Continuous",
  labelStyle: {
    color: '#333333',
    bgColor: '#FFFFFF',
    align: 'center',
    font: 'Arial',
    italic: false,
    bold: false,
    underline: false,
    size: 11,
  },
  orient:"top",
  rank:100,
  scale:scaleLinear()
    .domain([0, 100])
    .range([0, 1000]),
  showAxis:true,
  showGrid:true,
  showLabels:true,
  showTicks:true,
  tickStep:20000,
  unit:"V",
};

const yAxis = {
  orient: 'top',
  format: '.3f',
  showAxis: true,
  showLabels: true,
  showTicks: true,
  autoLimits: false,
  autoTick: true,
  tickStep: 40,
  showPointLabels: false,
  showGrid: true,
  gridStyle: 'Continuous',
  gridSize: 2,
  unit: 'l',
  labelStyle: { color: '#008' },
  logarithmic: false,
  scale:scaleLinear()
  .domain([0, 100])
  .range([500, 0]),
};

const line = {
  colorAccessor: 'color',
  fill: '#FFBF00',
  lineSize: 2,
  lineStyle: 'Continuous',
  pointSize: 2,
  pointStyle: 'Square',
  tooltipFormatter: () => {},
  xAccessor: null,
  xTooltipAccessor: null,
  yAccessor: null,
  yTooltipAccessor: null,
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GRIZZLY_PROPS:
      return {
        ...state,
        grizzlyProps: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

/**
 * Request initialState asynchronously from main process
 */
const store = createStore(reducer, {});
const dispatch = store.dispatch;

const GrizzlyWrapper = props =>
  (props.grizzlyProps ? <GrizzlyChart {...props.grizzlyProps} /> : <h4>No props</h4>);


GrizzlyWrapper.propTypes = {
  grizzlyProps: PropTypes.shape(),
};
GrizzlyWrapper.defaultProps = {
  grizzlyProps: null,
};

const GrizzlyChartContainer = connect(
  state => ({ grizzlyProps: state.grizzlyProps }),
  {}
)(GrizzlyWrapper);

render(
  <Provider store={store}>
    <div>
      <h3 className="text-center">Grizzly benchmark</h3>
      <br />
      <br />
      <div className="row">
        <div className="col-xs-9">
          <GrizzlyChartContainer />
        </div>
        <div className="col-xs-3" >
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: getPayload([
                    {
                      xId: 'time',
                      yId: 'vBat',
                      tdbid: 'TMMGT_BC_VIRTCHAN3',
                      dots: data1000Points()
                    }
                  ]),
                }
              );
            }}
          >Render with a single line of 1000 points</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: getPayload([
                    {
                      xId: 'time',
                      yId: 'vBat',
                      tdbid: 'TMMGT_BC_VIRTCHAN3',
                      dots: data10000PointsColorChanging()
                    }
                  ]),
                }
              );
            }}
          >Render with a single line of 1000 points</button>
        </div>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);

function getPayload(data) {
  let payload = {...propsStub};

  _.forEach((d) => {
    const dots = d.dots;
    const first = dots[Object.keys(dots)[0]];
    const indexes = Object.keys(dots).map(Number);
    const minIndexes = {
      min: (_.min(indexes)),
      max: (_.max(indexes)),
    };
    const indexesY = Object.values(_.mapValues('value', dots));
    const minIndexesY = {
      min: (_.min(indexesY) - 100),
      max: (_.max(indexesY) + 100),
    };

    let obj = {};
    _.forEach((o) => {
      obj[o.x] = o;
    }, dots);

    payload = {
      ...payload,
      current: first.x,
      lines: [...payload.lines, {
        ...line,
        data: obj,
        dataAccessor: d.tdbid,
        id: d.tdbid,
        indexes: indexes,
        xAxis: {
          ...xAxis,
          id: d.xId,
          label: d.xId,
          calculatedExtents: [ minIndexes.min, minIndexes.max ],
          extents: [ minIndexes.min, minIndexes.max ],
        },
        xAxisId: d.xId,
        yAxis: {
          ...yAxis,
          id: d.yId,
          label: d.yId,
          extents: [ minIndexesY.min, minIndexesY.max ],
          calculatedExtents: [ minIndexesY.min, minIndexesY.max ],
        },
        yAxisId: d.yId,
      }],
      xAxes: [...payload.xAxes, {
        ...xAxis,
        extents: [ minIndexes.min, minIndexes.max ],
        calculatedExtents: [ minIndexes.min, minIndexes.max ],
        id: d.xId,
        label: d.xId,
      }],
      yAxes: [...payload.yAxes, {
        ...yAxis,
        extents: [ minIndexesY.min, minIndexesY.max ],
        calculatedExtents: [ minIndexesY.min, minIndexesY.max ],
        id: d.yId,
        label: d.yId,
      }],
    }
  }, data);

  return payload;
}


//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: getPayload(line10000Points)
//                }
//              );
//            }}
//          >Render with one line of 10 000 points</button>
//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: {
//                    ...propsGrizzly,
//                    lines: axisLines1line10000pointsColorChanging,
//                  },
//                }
//              );
//            }}
//          >Render with one line of 10 000 points and dynamic color</button>
//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: getPayload(line10000Points)
//                }
//              );
//            }}
//          >Render with one line of 10 000 points and color changing 3 times</button>
//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: {
//                    ...propsGrizzly,
//                    lines: axisLines2lines10000points,
//                  },
//                }
//              );
//            }}
//          >Render with two lines of 10 000 points</button>
//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: {
//                    ...propsGrizzly,
//                    lines: axisLines1line25000points,
//                  },
//                }
//              );
//            }}
//          >Render with one line of 25 000 points</button>
//          <br />
//          <button
//            className="btn btn-primary"
//            onClick={() => {
//              dispatch(
//                {
//                  type: SET_GRIZZLY_PROPS,
//                  payload: {
//                    ...propsGrizzly,
//                    lines: axisLines2lines25000points,
//                  },
//                }
//              );
//            }}
//          >Render with two lines of 25 000 points</button>
