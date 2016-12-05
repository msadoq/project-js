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
      <Line type="monotone" dataKey="avg" name='avg' unit='ms' stroke="#8884d8" isAnimationActive={false} />
      <Line type="monotone" dataKey="min" name='min' unit='ms' stroke="#82ca9d" isAnimationActive={false} />
      <Line type="monotone" dataKey="max" name='max' unit='ms' stroke="#740510" isAnimationActive={false} />
    </LineChart>
  </div>
);
