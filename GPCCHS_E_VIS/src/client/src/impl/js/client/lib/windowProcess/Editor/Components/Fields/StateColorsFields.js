/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import {
  Table,
  Glyphicon,
  Alert,
} from 'react-bootstrap';
import classnames from 'classnames';
import { HorizontalFormGroup } from '../Forms/';
import styles from './fields.css';
import ColorPicker from '../ColorPicker';
import { operators } from '../../../../common/operators';

export default class StateColorsFields extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
      insert: PropTypes.func,
    }).isRequired,
  }

  state = {
    error: null,
    editingIndex: null,
    currentColor: null,
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

  addStateColor = (e) => {
    e.preventDefault();
    const { currentColor } = this.state;
    const { fields } = this.props;
    fields.push(
      {
        color: currentColor || '#ffffff',
        condition: {
          field: this.fieldField.value,
          operator: this.operatorField.value,
          operand: this.operandField.value,
        },
      }
    );
    this.setState({ currentColor: null });
    this.resetFields();
  }

  /*
    Reset with default values if no argument is given
  */
  resetFields = (
    field = '',
    opt = Object.keys(operators)[0],
    opd = '',
  ) => {
    this.fieldField.value = field;
    this.operatorField.value = opt;
    this.operandField.value = opd;
  }

  editStateColor = (index) => {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    if (editingIndex === index) {
      this.resetFields();
      return this.setState({ editingIndex: null });
    }
    const stateColor = fields.get(index);
    this.resetFields(
      stateColor.condition.field,
      stateColor.condition.operator,
      stateColor.condition.operand
    );
    this.setState({
      editingIndex: index,
      currentColor: stateColor.color,
    });
  }

  updateColor = (color) => {
    this.setState({ currentColor: color });
  }

  removeStateColor = (index) => {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    fields.remove(index);
    if (editingIndex !== null) {
      this.setState({
        editingIndex: null,
        currentColor: null,
      });
      this.resetFields();
    }
  }

  updateStateColor = (e) => {
    e.preventDefault();
    const { fields } = this.props;
    const {
      editingIndex,
      currentColor,
    } = this.state;
    fields.remove(editingIndex);
    setTimeout(() => {
      fields.insert(
        editingIndex,
        {
          color: currentColor || '#ffffff',
          condition: {
            field: this.fieldField.value,
            operator: this.operatorField.value,
            operand: this.operandField.value,
          },
        }
      );
      this.resetFields();
      this.setState({
        editingIndex: null,
        currentColor: null,
      });
    }, 100);
  }

  render() {
    const { fields } = this.props;
    const { editingIndex } = this.state;
    const { error } = this.state;
    const stateColors = fields.getAll();
    const canEdit = editingIndex !== null;
    const canAdd = this.operandField && this.fieldField &&
      this.operandField.value.length && this.fieldField.value.length;
    return (
      <div>
        <Table condensed striped style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th colSpan={1}>Color</th>
              <th colSpan={1}>Expression</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              stateColors.length ? stateColors.map(
                (stateColor, index) => (
                  <tr
                    key={index}
                    className={editingIndex === index ? styles.editingFilter : ''}
                  >
                    <td className="col-xs-1">
                      <span
                        className={styles.colorSquare}
                        style={{
                          backgroundColor: stateColor.color
                        }}
                      />
                    </td>
                    <td className="col-xs-9" style={{ verticalAlign: 'middle' }}>
                      {stateColor.condition.field}{' '}
                      <b>{ stateColor.condition.operator }{' '}</b>
                      {stateColor.condition.operand}
                    </td>
                    <td className="col-xs-1">
                      <Glyphicon
                        glyph="trash"
                        onClick={() => this.removeStateColor(null, index)}
                        title="remove state color"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td className="col-xs-1">
                      <Glyphicon
                        glyph="pencil"
                        onClick={() => this.editStateColor(index)}
                        title="edit state color"
                        style={{
                          cursor: 'pointer',
                          color: (editingIndex === index) ? '#0275D8' : 'inherit'
                        }}
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
        <HorizontalFormGroup label="color">
          <ColorPicker
            color={(editingIndex !== null && stateColors[editingIndex]) ?
              stateColors[editingIndex].color : '#ffffff'
            }
            onChange={this.updateColor}
          />
        </HorizontalFormGroup>
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
          { canEdit ?
            <input
              className={classnames('btn', 'btn-success')}
              style={{ width: '110px' }}
              type="submit"
              value="Edit state color"
              onClick={this.updateStateColor}
              disabled={error}
            /> :
              <input
                className={classnames('btn', 'btn-success')}
                style={{ width: '110px' }}
                type="submit"
                value="Add state color"
                onClick={this.addStateColor}
                disabled={!canAdd || error}
              />
          }
        </HorizontalFormGroup>
      </div>
    );
  }
}
