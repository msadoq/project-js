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
    points: PropTypes.any,
  };
 
    
  render() {

    
    let data = Object.keys(this.props.points).map(theX => Object.assign({ date: new Date(+theX) }, this.props.points[theX]));
    
    // console.log(this.props.points);
    
    data = this.props.points;
    data.map( obj => obj.date = new Date(+obj.x));
    
    if (data.length < 3) return <div/>
 



    // console.log(data.length);


    let yIdList = [];
   
    //TODO remove stub 
    yIdList = this.props.subscriptions
    
    let plotConfiguration = { sub1 : { stroke : "purple"}, sub2 : { stroke : "orange"}, sub3 : { stroke : "black"}};
    
    let series = yIdList.map( (yId, index) => 
        <ScatterLineSeries pointsStyle="circle" lineStyle="continuous" stroke={plotConfiguration[yId].stroke} yAccessor={(d) => d[yId]}/>)
    

    return (
      <div>
        <ChartCanvas 
        seriesName="JPP"
        discontinuous
        xScale={xScale} 
        margin={{left : 50, right : 50, top:10, bottom:30}}
        xAccessor={(d) => d.date} 
        data={data}
        width={1000}
        height={500} 
        xExtents={[data[0].date, new Date(data[0].date.getTime()+100000)]} 
      >
        <Chart id={1} ref={1}  yExtents={d => [0,100]}>
        <XAxis axisAt="bottom" orient="bottom"  />
        <YAxis axisAt="left" orient="left" /> 
        {series}
      </Chart>
      <EventCapture mouseMove={true} pan={true} mainChart={0} defaultFocus={true} zoom={true}/>
      </ChartCanvas>
      </div>
    );
  }
}

