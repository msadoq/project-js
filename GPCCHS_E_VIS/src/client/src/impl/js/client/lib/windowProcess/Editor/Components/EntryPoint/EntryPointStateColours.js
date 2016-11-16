import React, { PropTypes } from 'react';
import {
  Table,
  Glyphicon
} from 'react-bootstrap';
import ColorPicker from '../ColorPicker';
import FilterData from '../FilterData';

const filters = [
  'convertedValue', 'extractedValue', 'groundDate',
  'isNominal', 'isObsolete', 'monitoringState',
  'onBoardDate', 'rawValue', 'triggerOffCounter',
  'triggerOnCounter', 'validityState'
];

export default class EntryPointStyle extends React.Component {
  static propTypes = {
    stateColours: PropTypes.array.isRequired,
    newStateColor: PropTypes.string.isRequired,
    removeStateColor: PropTypes.func.isRequired,
    handleFilter: PropTypes.func.isRequired,
    handleChangeStateColor: PropTypes.func.isRequired,
    addStateColor: PropTypes.func.isRequired,
  }

  render() {
    const {
      stateColours = [],
      newStateColor,
      removeStateColor,
      handleFilter,
      handleChangeStateColor,
      addStateColor
    } = this.props;

    const filterOptions = filters.map((filter, key) =>
      <option key={key} value={filter}>{filter}</option>);

    return (
      <Table condensed striped style={{ fontSize: '12px' }}>
        <thead>
          <tr>
            <th>Color</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {stateColours.length
            ? stateColours.map((stateColour, key) => (
              <tr key={key}>
                <td className="col-xs-2">
                  <ColorPicker color={stateColour.colour} />
                </td>
                <td className="col-xs-9">
                  {stateColour.condition.field}{' '}
                  {stateColour.condition.operator}{' '}
                  {stateColour.condition.operand}
                </td>
                <td className="col-xs-1">
                  <Glyphicon glyph="trash" onClick={() => removeStateColor(key)} />
                </td>
              </tr>
                ))
            : <tr>no marker</tr>}
          <tr>
            <td className="col-xs-2">
              <ColorPicker
                color={newStateColor}
                onChange={handleChangeStateColor}
              />
            </td>
            <td className="col-xs-8">
              <FilterData
                filterOptions={filterOptions} onChange={handleFilter}
              />
            </td>
            <td className="col-xs-2">
              <Glyphicon glyph="plus" onClick={addStateColor} />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
