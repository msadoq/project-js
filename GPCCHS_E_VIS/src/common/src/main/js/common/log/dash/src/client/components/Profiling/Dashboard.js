import React from 'react';

export default ({process}) => (
  <div style={{margin: '1em', float:'left'}}>
    <h4>Last values</h4>
    <table>
      {Object.keys(process.data[process.data.length - 1]).map(k => (
      <tr>
        <td>
          {k}
        </td>
        <td>
          {process.data[process.data.length - 1][k]}
        </td>
      </tr>
      ))}
    </table>
  </div>
);
