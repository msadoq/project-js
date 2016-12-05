import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  getRandomColor,
} from '../../util';

export default ({process}) => (
  <div style={{float:'left'}}>
    <BarChart width={1000} height={400} data={process.data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="time"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="5 5"/>
      <Tooltip/>
      <Legend />
      {process.data.reduce((acc, t) => {
        acc = acc.concat(Object.keys(t));
        // Get array of unique keys
        return acc.filter((t, pos, arr) => arr.indexOf(t) === pos);
      }, []).map((k,i) => <Bar
        dataKey={k}
        name={k}
        unit='ms'
        fill={getRandomColor()}
        key={i}
        isAnimationActive={false} />
      )}
    </BarChart>
  </div>
);
