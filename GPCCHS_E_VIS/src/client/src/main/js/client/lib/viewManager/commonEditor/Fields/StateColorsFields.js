// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// VERSION : 1.1.2 : FA : #6780 : 21/06/2017 : Apply default state colors in views
// END-HISTORY
// ====================================================================

/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import {
  Table,
  Glyphicon,
  Alert,
} from 'react-bootstrap';
import classnames from 'classnames';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ColorPicker from 'windowProcess/commonReduxForm/ColorPicker';
import { operators } from 'common/operators';
import styles from './fields.css';

export default class StateColorsFields extends React.Component {

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
      this.setState({
        error: null,
      });
    } else if (!error && (!fieldLength || !operandLength)) {
      this.setState({
        error: 'Field and operand are required',
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
    opd = ''
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
      this.setState({ editingIndex: null });
    } else {
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
    const tableStyle = { fontSize: '12px' };
    const glyphTrashStyle = { cursor: 'pointer' };
    const glyphPencilStyle = { cursor: 'pointer', color: 'inherit' };
    const glyphPencilEditingStyle = { cursor: 'pointer', color: '#0275D8' };
    return (
      <div>
        <Table condensed striped style={tableStyle}>
          <thead>
            <tr>
              <th colSpan={1}>Color</th>
              <th colSpan={1}>Expression</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              (stateColors && stateColors.length) ? stateColors.map(
                (stateColor, index) => (
                  <tr
                    key={`${stateColor.condition.field}${stateColor.condition.operator}${stateColor.condition.operand}`}
                    className={editingIndex === index ? styles.editingFilter : ''}
                  >
                    <td className="col-xs-1">
                      <span
                        className={styles.colorSquare}
                        style={{
                          backgroundColor: stateColor.color,
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
                        onClick={() => this.removeStateColor(index)}
                        title="remove state color"
                        style={glyphTrashStyle}
                      />
                    </td>
                    <td className="col-xs-1">
                      <Glyphicon
                        glyph="pencil"
                        onClick={() => this.editStateColor(index)}
                        title="edit state color"
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
              style={{ width: '110px' }}
              type="submit"
              value="Edit state color"
              onClick={this.updateStateColor}
              disabled={error}
            />
            :
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
