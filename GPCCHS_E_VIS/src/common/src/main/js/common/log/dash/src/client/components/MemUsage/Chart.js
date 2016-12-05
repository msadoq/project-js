import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default ({process}) => (
  <div style={{float:'left'}}>
    <h3>{process.pname} PID={process.pid}</h3>
    <LineChart width={450} height={180} data={process.data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="time"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="5 5"/>
      <Tooltip/>
      <Legend />
      <Line
        type='monotone'
        dataKey='rss'
        name='rss'
        unit='mb'
        stroke='#8884d8'
        activeDot={false}
        isAnimationActive={false} />
      <Line
        type='monotone'
        dataKey='heapTotal'
        name='heap total'
        unit='mb'
        stroke='#82ca9d'
        activeDot={false}
        isAnimationActive={false} />
      <Line
        type='monotone'
        dataKey='heapUsed'
        name='heap used'
        unit='mb'
        stroke='#740510'
        activeDot={false}
        isAnimationActive={false} />
    </LineChart>
  </div>
);
