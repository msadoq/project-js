import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import _get from 'lodash/get';
import _set from 'lodash/set';
import {
  Table,
  Glyphicon,
  Form,
} from 'react-bootstrap';
import ColorPicker from '../ColorPicker';
import {
  ColorPickerField,
  InputField,
  ReactSelectField
} from '../Fields/';
import EntryPointMonitoringStateColors from './EntryPointMonitoringStateColors';
import {
  ClearSubmitButtons,
  HorizontalFormGroup,
} from '../Forms/';
import operators from '../../../../common/operators';

/*
const filters = [
  'convertedValue', 'extractedValue', 'groundDate',
  'isNominal', 'isObsolete', 'monitoringState',
  'onBoardDate', 'rawValue', 'triggerOffCounter',
  'triggerOnCounter', 'validityState'
];
*/

class EntryPointStateColors extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    removeStateColor: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  render() {
    const {
      data,
      removeStateColor,
      pristine,
      reset,
      submitting,
      valid,
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Table condensed striped style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th>Color</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length ? data.map(
                (stateColor, key) => {
                  const foundOperator = Object.entries(operators).find(
                    o => o[1] === stateColor.condition.operator
                  );
                  return (
                    <tr key={key}>
                      <td className="col-xs-2">
                        <ColorPicker color={stateColor.color} />
                      </td>
                      <td className="col-xs-9" style={{ verticalAlign: 'middle' }}>
                        {stateColor.condition.field}{' '}
                        {
                            foundOperator ? foundOperator[0] : '?'
                        }{' '}
                        {stateColor.condition.operand}
                      </td>
                      <td className="col-xs-1">
                        <Glyphicon glyph="trash" onClick={() => removeStateColor(key)} />
                      </td>
                    </tr>
                  );
                }
              ) : (<tr><td colSpan={2} >no marker</td></tr>)
            }
          </tbody>
        </Table>
        <Form horizontal onSubmit={handleSubmit}>
          <div className="page-header">
            <h4>New state color</h4>
          </div>
          <HorizontalFormGroup label="Color">
            <Field
              name="color"
              component={ColorPickerField}
            />
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Field">
            <Field
              name="condition.field"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Operator">
            <Field
              name="condition.operator"
              clearable={false}
              component={ReactSelectField}
              options={Object.keys(operators).map(o => ({ label: o, value: o }))}
            />
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Operand">
            <Field
              name="condition.operand"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>
          <ClearSubmitButtons
            pristine={pristine}
            submitting={submitting}
            reset={reset}
            valid={valid}
          />
        </Form>
        <EntryPointMonitoringStateColors />
      </div>
    );
  }
}

const requiredFields = [
  'condition.operator',
  'condition.operand',
  'condition.field',
  'color',
];

const validate = (values = {}) => {
  const errors = {};
  requiredFields.forEach((fieldPath) => {
    if (!_get(values, fieldPath)) {
      _set(errors, fieldPath, 'Required');
    }
  });
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  validate,
})(EntryPointStateColors);
