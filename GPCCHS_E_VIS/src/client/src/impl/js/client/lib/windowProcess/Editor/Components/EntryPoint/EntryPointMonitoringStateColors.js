import React, { PropTypes } from 'react';
import {
  Table,
  Glyphicon,
} from 'react-bootstrap';
import { withState, pure } from 'recompose';

import { monitoringStateColors as mColors } from '../../../common/colors';

const s = {
  title: {
    overflow: 'hidden',
  },
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

export const MonitoringStateColors = ({ visible, setVisible }) => (
  <div className="mt10">
    <h4 className="mb10" style={s.title}>
      <a onClick={() => setVisible(!visible)}>
        <span className="col-xs-11">Monitoring state colors</span>
        <Glyphicon className="col-xs-1" glyph={visible ? 'triangle-top' : 'triangle-bottom'} />
      </a>
    </h4>
    {visible && <Table condensed striped style={{ fontSize: '12px' }}>
      <thead>
        <tr>
          <th>Color</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(mColors).map((c, i) => (
          <tr key={`color-${i}`}>
            <td className="col-xs-2">
              <div
                style={{
                  ...s.colorBox,
                  backgroundColor: mColors[c],
                }}
              />
            </td>
            <td className="col-xs-10" style={s.condition}>
              monitoring state equals {c}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>}
  </div>
);

MonitoringStateColors.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default withState('visible', 'setVisible', false)(pure(MonitoringStateColors));
