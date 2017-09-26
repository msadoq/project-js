// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : FA : #6780 : 21/06/2017 : Apply default state colors in views
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import {
  Table,
  Glyphicon,
} from 'react-bootstrap';
import _lowerCase from 'lodash/lowerCase';

import { getStateColors } from '../../../windowProcess/common/colors';

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
    verticalAlign: 'middle',
  },
};

const tableStyle = { fontSize: '12px' };

const changeVisibility = prevState => ({
  visible: !prevState.visible,
});

export default class MonitoringStateColors extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onClick = () => {
    this.setState(changeVisibility);
  }

  render() {
    const {
      visible,
    } = this.state;

    return (
      <div className="mt10">
        <h4 className="mb10" style={s.title}>
          <button className="btn-a w100" onClick={this.onClick}>
            <span className="col-xs-11 pl0">State colors</span>
            <Glyphicon className="col-xs-1" glyph={visible ? 'triangle-top' : 'triangle-bottom'} />
          </button>
        </h4>
        {visible && <Table condensed striped style={tableStyle}>
          <thead>
            <tr>
              <th>Color</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(getStateColors()).map(c => (
              <tr key={c}>
                <td className="col-xs-2">
                  <div
                    style={{
                      ...s.colorBox,
                      backgroundColor: getStateColors()[c],
                    }}
                  />
                </td>
                <td className="col-xs-10" style={s.condition}>
                  {_lowerCase(c)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>}
      </div>
    );
  }
}
