import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import GrizzlyChart from '../../lib/viewManager/PlotView/Components/View/Grizzly/Chart';
import {
  data1000Points, data1000Points2, data10000Points,
  data10000Points2, data25000Points, data25000Points2,
  data10000PointsColorChanging, data10000Points4Colors,
} from './data';

process.title = 'gpcchs_grizzly_dev';

const SET_GRIZZLY_PROPS = 'SET_GRIZZLY_PROPS';

const propsGrizzly = {
  height: 600,
  width: 1000,
  additionalStyle: {},
  tooltipColor: 'white',
  enableTooltip: true,
  allowYZoom: true,
  allowYPan: true,
  allowZoom: true,
  allowPan: true,
  perfOutput: true,
  current: 10000,
  yAxesAt: 'left',
  xAxisAt: 'bottom',
  xAxis: {
    xExtents: [100000, 101000],
    tickStep: 10,
    autoTick: true,
    showTicks: true,
  },
  yAxes: [
    {
      id: 'axis-y-1',
      yExtents: [0, 2000],
      data: null,
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
      label: 'Axis Y One',
      labelStyle: { color: '#008' },
      logarithmic: false,
    },
    {
      id: 'axis-y-2',
      yExtents: [0, 2000],
      data: null,
      orient: 'top',
      format: '.3f',
      showAxis: true,
      showLabels: true,
      showTicks: true,
      autoLimits: false,
      autoTick: true,
      tickStep: 40,
      showPointLabels: false,
      showGrid: false,
      gridStyle: 'Continuous',
      gridSize: 2,
      unit: 'l',
      label: 'Axis Y Two',
      labelStyle: {},
      logarithmic: false,
    },
  ],
};

const line1000Points = {
  data: data1000Points(), // data is accessed through axis.data
  id: 'line-1-1000-points',
  yAxis: 'axis-y-1',
  fill: '#F23',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line1000Points2 = {
  data: data1000Points2(), // data is accessed through axis.data
  id: 'line-2-1000-points',
  yAxis: 'axis-y-1',
  fill: '#F46',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line1000PointsColorChanging = {
  data: data10000PointsColorChanging(), // data is accessed through axis.data
  id: 'line-2-1000-points',
  yAxis: 'axis-y-1',
  fill: '#F46',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line1000Points4Colors = {
  data: data10000Points4Colors(), // data is accessed through axis.data
  id: 'line-2-1000-points',
  yAxis: 'axis-y-1',
  fill: '#F46',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line10000Points = {
  data: data10000Points(), // data is accessed through axis.data
  id: 'line-1-10000-points',
  yAxis: 'axis-y-1',
  fill: '#24F',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line10000Points2 = {
  data: data10000Points2(), // data is accessed through axis.data
  id: 'line-2-10000-points',
  yAxis: 'axis-y-1',
  fill: '#46B',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line25000Points = {
  data: data25000Points(), // data is accessed through axis.data
  id: 'line-1-25000-points',
  yAxis: 'axis-y-1',
  fill: '#FA8',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const line25000Points2 = {
  data: data25000Points2(), // data is accessed through axis.data
  id: 'line-2-25000-points',
  yAxis: 'axis-y-1',
  fill: '#DA1',
  lineSize: 1,
  lineStyle: 'Continuous',
  pointStyle: 'Square',
  pointSize: 2,
  dataAccessor: null,
  xAccessor: null, // default .x
  yAccessor: null, // default .value
  colorAccessor: d => d.color,
};

const axisLines2lines1000points = [line1000Points, line1000Points2];
const axisLines1line10000points = [line10000Points];
const axisLines1line10000pointsColorChanging = [line1000PointsColorChanging];
const axisLines1line1000Points4Colors = [line1000Points4Colors];
const axisLines2lines10000points = [line10000Points, line10000Points2];
const axisLines1line25000points = [line25000Points];
const axisLines2lines25000points = [line25000Points, line25000Points2];

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GRIZZLY_PROPS:
      return {
        ...state,
        grizzlyProps: {
          ...action.payload,
          lines: action.payload.lines.map(line =>
            ({
              ...line,
              data: [].concat(line.data), // new ref each time
            })
          ),
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
// const getState = store.dispatch;

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
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines2lines1000points,
                  },
                }
              );
            }}
          >Render with 2000 points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines1line10000points,
                  },
                }
              );
            }}
          >Render with 10 000 points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines1line10000pointsColorChanging,
                  },
                }
              );
            }}
          >Render with 10 000 points and dynamic color</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines1line1000Points4Colors,
                  },
                }
              );
            }}
          >Render with 10 000 points and color changing 3 times</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines2lines10000points,
                  },
                }
              );
            }}
          >Render with 20 000 points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines1line25000points,
                  },
                }
              );
            }}
          >Render with 25 000 points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                {
                  type: SET_GRIZZLY_PROPS,
                  payload: {
                    ...propsGrizzly,
                    lines: axisLines2lines25000points,
                  },
                }
              );
            }}
          >Render with 50 000 points</button>
        </div>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);
