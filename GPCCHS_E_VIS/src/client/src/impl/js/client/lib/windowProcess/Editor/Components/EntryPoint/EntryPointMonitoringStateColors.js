import React from 'react';
import { monitoringStateColors as mColors } from '../../../common/colors';

const s = {
  colorBox: {
    width: '30px',
    height: '19px',
    border: '1px solid',
    borderColor: '#ccc',
  },
  condition: {
    verticalAlign: 'middle'
  },
};

export default () => (
  Object.keys(mColors).map((c, i) => (
    <tr key={`color-${i}`}>
      <td className="col-xs-2">
        <div
          style={{
            ...s.colorBox,
            backgroundColor: mColors[c],
          }}
        />
      </td>
      <td className="col-xs-9" style={s.condition}>
        monitoringState equals {c}
      </td>
      <td className="col-xs-1" />
    </tr>
  ))
);
