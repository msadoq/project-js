import React, { Component, PropTypes } from 'react';

import ReStock from 'react-stockcharts';

const { ChartCanvas, Chart, EventCapture} = ReStock;
const { LineSeries, ScatterSeries, CircleMarker } = ReStock.series;
const { XAxis, YAxis } = ReStock.axes;
import d3 from 'd3';



import Scatter from './ScatterLineSeries';
const { ScatterLineSeries } = window;

let xScale = d3.time.scale();




var log = (m, ...rest) => {
//	console.log(m, rest);
	;
}
var warn = (m, ...rest) => {
	console.warn(m, ...rest);
	;
}
var error = (m, ...rest) => {
	console.error(m, rest);
	;
}




export default class Plot extends Component {
  static propTypes = {
    subscriptions: PropTypes.array.isRequired,
    visible: PropTypes.array.isRequired,
    points: PropTypes.any,
  };


  render() {
    const points = this.props.points;

    if (Object.keys(points).length < 3) return <div />;

    // console.log(data.length);

    let yIdList = [];

    yIdList = this.props.subscriptions;
    const visibleSubs = this.props.visible;

    const plotConfiguration = { 0: { stroke: 'green' }, 1: { stroke: 'purple' }, 2: { stroke: 'orange' }, 3: { stroke: 'black' }, 4: { stroke: 'blue' }, 5: { stroke: 'red' } };

    let series = yIdList.map((yId, index) => {
      if (visibleSubs.includes(yId)) return <ScatterLineSeries key={yId} pointsStyle="circle" lineStyle="continuous" stroke={plotConfiguration[yId.split('sub')[1] % 6].stroke} yAccessor={(d) => d[yId]} />;
    });


    return (
      <div>
        <ChartCanvas
          seriesName="JPP"
          discontinuous
          xScale={xScale}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          xAccessor={(d) => new Date(+d.x)}
          data={points}
          width={1000}
          height={500}
          xExtents={[new Date(points[0].x), new Date(points[0].x + 100000000)]}
        >
          <Chart id={1} ref={1} yExtents={d => [0, 100]}>
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="left" orient="left" />
            {series}
          </Chart>
          <EventCapture mouseMove={true} pan={true} mainChart={0} defaultFocus={true} zoom={true} />
        </ChartCanvas>
      </div>
    );
  }
}

