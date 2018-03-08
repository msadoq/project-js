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
import _get from 'lodash/get';
import {
  Table,
  Glyphicon,
  Alert,
} from 'react-bootstrap';
import moment from 'moment';
import classnames from 'classnames';
import { DATETIME_TILL_MS_FORMAT } from 'constants';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import { operators } from 'common/operators';
import ComObjectFilterFieldContainer from './ComObjectFilterFieldContainer';
import styles from './fields.css';
import { comObjectType } from '../../common/Components/types';

const PROTOBUF_TIME_TYPE = 'ccsds_mal.protobuf.TIME';

export default class FiltersFields extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
      insert: PropTypes.func,
      getAll: PropTypes.func,
    }).isRequired,
    form: PropTypes.string.isRequired,
    // from container
    comObjectFields: PropTypes.arrayOf(comObjectType),
  }

  static defaultProps = {
    comObjectFields: [],
  };

  state = {
    errors: [],
    editingIndex: null,
    operandPlaceHolder: null,
  }

  getFilteredOperators = (allOperators, field) => (
    this.isATimeType(field)
      ? Object.keys(allOperators)
        .filter(o => !o.match(/CONTAINS/)) // CONTAINS and !CONTAINS are meaningless with a time
        .map(o => <option key={o} value={o}>{o}</option>)
      : Object.keys(allOperators)
        .map(o => <option key={o} value={o}>{o}</option>)
  );

  isATimeType = (field) => {
    const comObjectField = field && this.props.comObjectFields.find(co => co.name === field.value);
    return comObjectField && comObjectField.type === PROTOBUF_TIME_TYPE;
  };

  handleFieldInputChange = (selected) => {
    this.handleInputChange('fieldField', selected);
    const selectedField = this.props.comObjectFields.find(o => o.name === selected);
    const operandPlaceHolder = selectedField && selectedField.type === PROTOBUF_TIME_TYPE
      ? DATETIME_TILL_MS_FORMAT
      : undefined;
    this.setState({ operandPlaceHolder });
  };

  handleOperandInputChange = input => this.handleInputChange('operandField', input.target.value);

  handleInputChange = (input, value) => {
    this[input].value = value;
    const fieldLength = _get(this.fieldField, 'value.length');
    const operandLength = this.operandField.value.length;
    const errors = [];
    if (this.isATimeType(this.fieldField)
      && operandLength // if no operand defined, no error
      && !moment(this.operandField.value, DATETIME_TILL_MS_FORMAT, true).isValid()) {
      errors.push('Invalid operand date format.');
    }
    /* eslint-disable no-bitwise */
    if (!fieldLength ^ !operandLength) {
      errors.push('Field and operand are required.');
    }

    this.setState({ errors });
  };

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
  resetFields = (field = '',
                 opt = Object.keys(operators)[0],
                 opd = '') => {
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
    const { fields, form } = this.props;
    const { editingIndex, errors, operandPlaceHolder } = this.state;
    const filters = fields.getAll();
    const canEdit = editingIndex !== null;
    const canAdd = _get(this.operandField, 'value.length') && _get(this.fieldField, 'value.length');
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
            {(filters && filters.length)
              ? filters.map(
                (filter, index) => (
                  <tr
                    key={`${filter.field}${filter.operator}${filter.operand}`}
                    className={editingIndex === index ? styles.editingFilter : ''}
                  >
                    <td className="col-xs-10" style={{ verticalAlign: 'middle' }}>
                      {filter.field}{' '}
                      <b>{filter.operator}{' '}</b>
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
              )
              : (<tr><td colSpan={3}>no filter</td></tr>)
            }
          </tbody>
        </Table>
        {errors && errors.map(e => <Alert bsStyle="danger">{e}</Alert>)}
        <HorizontalFormGroup label="field">
          <ComObjectFilterFieldContainer
            onChange={this.handleFieldInputChange}
            value={this.fieldField ? this.fieldField.value : ''}
            ref={(el) => { this.fieldField = el; }}
            formName={form}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="operator">
          <select
            className="form-control"
            ref={(el) => {
              this.operatorField = el;
            }}
          >
            {this.getFilteredOperators(operators, this.fieldField)}
          </select>
        </HorizontalFormGroup>
        <HorizontalFormGroup label="operand">
          <input
            className="form-control"
            ref={(el) => {
              this.operandField = el;
            }}
            onChange={this.handleOperandInputChange}
            placeholder={operandPlaceHolder}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup>
          {canEdit ?
            <input
              className={classnames('btn', 'btn-success')}
              style={{ width: '90px' }}
              type="submit"
              value="Edit filter"
              onClick={this.updateFilter}
              disabled={errors.length}
            />
            :
            <input
              className={classnames('btn', 'btn-success')}
              style={{ width: '90px' }}
              type="submit"
              value="Add filter"
              onClick={this.addFilter}
              disabled={!canAdd || errors.length}
            />
          }
        </HorizontalFormGroup>
      </div>
    );
  }
}
