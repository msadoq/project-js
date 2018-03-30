// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 16/05/2017 : Apply filters considering data type
// END-HISTORY
// ====================================================================

/* eslint import/no-webpack-loader-syntax:0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Glyphicon,
  Alert,
} from 'react-bootstrap';
import classnames from 'classnames';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import { operators } from 'common/operators';
import styles from './fields.css';

export default class FiltersFields extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
      insert: PropTypes.func,
      getAll: PropTypes.func,
    }).isRequired,
  }

  state = {
    error: null,
    editingIndex: null,
  }

  onInputChange = () => {
    const { error } = this.state;
    const fieldLength = this.fieldField.value.length;
    const operandLength = this.operandField.value.length;
    if (error && (
      (fieldLength && operandLength) ||
      (!fieldLength && !operandLength)
    )) {
      this.setState({
        error: null,
      });
    } else if (!error && (!fieldLength || !operandLength)) {
      this.setState({
        error: 'Field and operand are required',
      });
    }
  }

  addFilter = (e) => {
    e.preventDefault();
    const { fields } = this.props;
    fields.push(
      {
        field: this.fieldField.value,
        operator: this.operatorField.value,
        operand: this.operandField.value.toString(),
      }
    );
    this.resetFields();
  }

  /*
    Reset with default values if no argument is given
  */
  resetFields = (
    field = '',
    opt = Object.keys(operators)[0],
    opd = ''
  ) => {
    this.fieldField.value = field;
    this.operatorField.value = opt;
    this.operandField.value = opd;
  }

  editFilter = (index) => {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    if (editingIndex === index) {
      this.resetFields();
      return this.setState({ editingIndex: null });
    }
    const filter = fields.get(index);
    this.resetFields(
      filter.field,
      filter.operator,
      filter.operand
    );
    return this.setState({ editingIndex: index });
  }

  removeFilter = (index) => {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    fields.remove(index);
    if (editingIndex !== null) {
      this.setState({ editingIndex: null });
      this.resetFields();
    }
  }

  updateFilter = (e) => {
    e.preventDefault();
    const { fields } = this.props;
    const { editingIndex } = this.state;
    fields.remove(editingIndex);
    setTimeout(() => {
      fields.insert(
        editingIndex,
        {
          field: this.fieldField.value,
          operator: this.operatorField.value,
          operand: this.operandField.value,
        }
      );
      this.resetFields();
      this.setState({ editingIndex: null });
    }, 100);
  }

  render() {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    const { error } = this.state;
    const filters = fields.getAll();
    const canEdit = editingIndex !== null;
    const canAdd = this.operandField && this.fieldField &&
      this.operandField.value.length && this.fieldField.value.length;
    const tableStyle = { fontSize: '12px' };
    const glyphTrashStyle = { cursor: 'pointer' };
    const glyphPencilStyle = { cursor: 'pointer', color: 'inherit' };
    const glyphPencilEditingStyle = { cursor: 'pointer', color: '#0275D8' };
    return (
      <div
        className={styles.filterFields}
      >
        <Table condensed striped style={tableStyle}>
          <thead>
            <tr>
              <th colSpan={1}>Filters</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              (filters && filters.length) ? filters.map(
                (filter, index) => (
                  <tr
                    key={`${filter.field}${filter.operator}${filter.operand}`}
                    className={editingIndex === index ? styles.editingFilter : ''}
                  >
                    <td className="col-xs-10" style={{ verticalAlign: 'middle' }}>
                      {filter.field}{' '}
                      <b>{ filter.operator }{' '}</b>
                      {filter.operand}
                    </td>
                    <td className="col-xs-1">
                      <Glyphicon
                        glyph="trash"
                        onClick={() => this.removeFilter(index)}
                        title="remove filter"
                        style={glyphTrashStyle}
                      />
                    </td>
                    <td className="col-xs-1">
                      <Glyphicon
                        glyph="pencil"
                        onClick={() => this.editFilter(index)}
                        title="edit filter"
                        style={editingIndex === index ? glyphPencilEditingStyle : glyphPencilStyle}
                      />
                    </td>
                  </tr>
                )
              ) : (<tr><td colSpan={3} >no filter</td></tr>)
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
              Object.keys(operators).map(o => <option key={o} value={o}>{o}</option>)
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
          { canEdit ?
            <input
              className={classnames('btn', 'btn-success')}
              style={{ width: '90px' }}
              type="submit"
              value="Edit filter"
              onClick={this.updateFilter}
              disabled={error}
            />
            :
            <input
              className={classnames('btn', 'btn-success')}
              style={{ width: '90px' }}
              type="submit"
              value="Add filter"
              onClick={this.addFilter}
              disabled={!canAdd || error}
            />
          }
        </HorizontalFormGroup>
      </div>
    );
  }
}
