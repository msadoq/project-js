/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import {
  Table,
  Glyphicon,
  Alert,
} from 'react-bootstrap';
import classnames from 'classnames';
import { HorizontalFormGroup } from '../Forms/';
import operators from '../../../../common/operators';

export default class FilterFields extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
    }).isRequired,
  }

  state = {
    error: null,
  }

  onInputChange = () => {
    const { error } = this.state;
    const fieldLength = this.fieldField.value.length;
    const operandLength = this.operandField.value.length;
    if (error && (
      (fieldLength && operandLength) ||
      (!fieldLength && !operandLength)
    )) {
      return this.setState({
        error: null
      });
    } else if (!error && (!fieldLength || !operandLength)) {
      this.setState({
        error: 'Field and operand are required'
      });
    }
  }

  addFilter = (e) => {
    e.preventDefault();
    this.props.fields.push(
      {
        field: this.fieldField.value,
        operator: this.operatorField.value,
        operand: this.operandField.value,
      }
    );
  }

  render() {
    const { fields } = this.props;
    const { error } = this.state;
    const filters = fields.getAll();
    return (
      <div>
        <Table condensed striped style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th colSpan={2}>Filters</th>
            </tr>
          </thead>
          <tbody>
            {
              filters.length ? filters.map(
                (filter, index) => (
                  <tr key={index}>
                    <td className="col-xs-9" style={{ verticalAlign: 'middle' }}>
                      {filter.field}{' '}
                      <b>{ filter.operator }{' '}</b>
                      {filter.operand}
                    </td>
                    <td className="col-xs-3">
                      <Glyphicon
                        glyph="trash"
                        onClick={() => fields.remove(index)}
                        title="remove filter"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                  </tr>
                )
              ) : (<tr><td colSpan={2} >no filter</td></tr>)
            }
          </tbody>
        </Table>
        {error && (<div><br /><Alert bsStyle="danger" className="m0">
          {error}
        </Alert><br /></div>)}
        <HorizontalFormGroup label="field">
          <input
            className="form-control"
            ref={(el) => { this.fieldField = el; }}
            onChange={this.onInputChange}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="operator">
          <select
            className="form-control"
            ref={(el) => { this.operatorField = el; }}
          >
            {
              Object.keys(operators).map((o, i) => <option key={i} value={o}>{o}</option>)
            }
          </select>
        </HorizontalFormGroup>
        <HorizontalFormGroup label="operand">
          <input
            className="form-control"
            ref={(el) => { this.operandField = el; }}
            onChange={this.onInputChange}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup>
          <input
            className={classnames('btn', 'btn-success')}
            style={{ width: '90px' }}
            type="submit"
            value="Add filter"
            onClick={this.addFilter}
            disabled={error}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
