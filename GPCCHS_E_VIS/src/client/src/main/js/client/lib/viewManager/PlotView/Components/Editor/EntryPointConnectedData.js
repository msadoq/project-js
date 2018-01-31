import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
} from 'redux-form';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import TextareaField from '../../../../windowProcess/commonReduxForm/TextareaField';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';
import FiltersFields from '../../../commonEditor/Fields/FiltersFields';
import styles from './EntryPointConnectedData.css';


/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedData extends Component {
  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      axes,
      timelines,
      unitX,
      unitY,
      unit,
      xAxisId,
      yAxisId,
      axisId,
      domains,
      parametric,
      timeline,
      stringParameter,
    } = this.props;

    let filteredAxes = [];
    if (axes) {
      filteredAxes = Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axisId: key,
      }))
      .filter(axis =>
        [unitX, unitY, unit].includes(axis.unit) ||
        axis.id === xAxisId || axis.id === yAxisId || axis.id === axisId
      );
    }

    // Determine elligible axes : must match the unit
    let connectedDataUnitFilteredAxis = filteredAxes.filter(a => a.unit === unit);
    const noCorrespondingAxis = !connectedDataUnitFilteredAxis.find(axis => axis.id === axisId);
    connectedDataUnitFilteredAxis = connectedDataUnitFilteredAxis
      .map(axis => ({
        label: axis.label,
        value: axis.axisId,
      })).concat({
        label: '-',
        value: '-',
      });
    if (noCorrespondingAxis) {
      connectedDataUnitFilteredAxis = connectedDataUnitFilteredAxis
      .concat({ label: axisId, value: axisId, disabled: true });
    }

    // Determine elligible axes for X and Y : must match the unit
    let connectedDataParametricFilteredAxisX = filteredAxes.filter(a => a.unit === unitX);
    let connectedDataParametricFilteredAxisY = filteredAxes.filter(a => a.unit === unitY);
    let noCorrespondingAxisX = false;
    let noCorrespondingAxisY = false;
    if (parametric) {
      // X
      noCorrespondingAxisX = !connectedDataParametricFilteredAxisX
        .find(axis => axis.id === xAxisId);
      connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
        .map(axis => ({
          label: axis.label,
          value: axis.axisId,
        })).concat({
          label: '-',
          value: '-',
        });
      if (noCorrespondingAxisX && xAxisId !== '-') {
        connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
        .concat({ label: xAxisId, value: xAxisId, disabled: true });
      }
      // Y
      noCorrespondingAxisY = !connectedDataParametricFilteredAxisY
        .find(axis => axis.id === yAxisId);
      connectedDataParametricFilteredAxisY = connectedDataParametricFilteredAxisY
        .map(axis => ({
          label: axis.label,
          value: axis.axisId,
        })).concat({
          label: '-',
          value: '-',
        });
      if (noCorrespondingAxisY && yAxisId !== '-') {
        connectedDataParametricFilteredAxisY = connectedDataParametricFilteredAxisY
        .concat({ label: yAxisId, value: yAxisId, disabled: true });
      }
    }

    let availableTimelines = [];
    const noCorrespondingTimeline = !timelines.find(t => t.id === timeline) && timeline !== '*';
    if (timelines) {
      availableTimelines = timelines.map(t =>
        ({
          label: t.id,
          value: t.id,
        })
      ).concat({
        label: '*',
        value: '*',
      })
      .concat(
        noCorrespondingTimeline ?
        { label: timeline, value: timeline, disabled: true } : []
      );
    }

    return (
      <Form
        horizontal
        onSubmit={handleSubmit}
        className={classnames(
          { 'redux-form-dirty': !pristine },
          'redux-form-padded'
        )}
      >
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
        <br />
        <div>
          <HorizontalFormGroup label="Parametric">
            <Field
              name="parametric"
              component={ButtonToggleField}
              styleOff="warning"
            />
          </HorizontalFormGroup>
          {
            parametric &&
            <div>
              <div className={styles.xDiv}>
                <h4>X</h4>
                <HorizontalFormGroup label="Formula X">
                  <Field
                    name="connectedDataParametric.formulaX"
                    component={TextareaField}
                    rows="4"
                    className="form-control input-sm"
                  />
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Unit X">
                  <Field
                    name="connectedDataParametric.unitX"
                    component={InputField}
                    type="text"
                    className="form-control input-sm"
                  />
                  {axes &&
                    <p
                      style={{ fontSize: '0.9em', paddingTop: '2px' }}
                    >
                      { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
                    </p>
                  }
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Axis X">
                  <Field
                    name="connectedDataParametric.xAxisId"
                    clearable={false}
                    component={ReactSelectField}
                    options={connectedDataParametricFilteredAxisX}
                  />
                  {
                    noCorrespondingAxisX &&
                    <span className="text-danger">No corresponding axis-unit pair, create it or change it</span>
                  }
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Domain X">
                  <Field
                    name="connectedDataParametric.domainX"
                    clearable={false}
                    component={ReactSelectField}
                    options={domains.map(d =>
                      ({
                        label: d.name,
                        value: d.name,
                      })
                    ).concat({
                      label: '*',
                      value: '*',
                    })}
                  />
                </HorizontalFormGroup>
              </div>
              <div className={styles.yDiv}>
                <h4>Y</h4>
                <HorizontalFormGroup label="Formula Y">
                  <Field
                    name="connectedDataParametric.formulaY"
                    component={TextareaField}
                    rows="4"
                    className="form-control input-sm"
                  />
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Unit Y">
                  <Field
                    name="connectedDataParametric.unitY"
                    component={InputField}
                    type="text"
                    className="form-control input-sm"
                  />
                  {axes &&
                    <p
                      style={{ fontSize: '0.9em', paddingTop: '2px' }}
                    >
                      { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
                    </p>
                  }
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Axis Y">
                  <Field
                    name="connectedDataParametric.yAxisId"
                    clearable={false}
                    component={ReactSelectField}
                    options={connectedDataParametricFilteredAxisY}
                  />
                  {
                    noCorrespondingAxisY &&
                    <span className="text-danger">No corresponding axis-unit pair, create it or change it</span>
                  }
                </HorizontalFormGroup>
                <HorizontalFormGroup label="Domain Y">
                  <Field
                    name="connectedDataParametric.domainY"
                    clearable={false}
                    component={ReactSelectField}
                    options={domains.map(d =>
                      ({
                        label: d.name,
                        value: d.name,
                      })
                    ).concat({
                      label: '*',
                      value: '*',
                    })}
                  />
                </HorizontalFormGroup>
              </div>
            </div>
          }
          {
            !parametric &&
            <div>
              <HorizontalFormGroup label="Formula">
                <Field
                  name="connectedData.formula"
                  component={TextareaField}
                  rows="4"
                  className="form-control input-sm"
                />
              </HorizontalFormGroup>

              <HorizontalFormGroup label="Field X">
                <Field
                  name="connectedData.fieldX"
                  component={InputField}
                  type="text"
                  className="form-control input-sm"
                />
              </HorizontalFormGroup>

              <HorizontalFormGroup label="String parameter">
                <Field
                  name="connectedData.stringParameter"
                  component={ButtonToggleField}
                  textOn="YES"
                  textOff="NO"
                  styleOff="warning"
                />
              </HorizontalFormGroup>
              {
                stringParameter &&
                <HorizontalFormGroup label="Y value">
                  <Field
                    name="connectedData.defaultY"
                    component={InputField}
                    normalize={val => parseInt(val, 10)}
                    type="text"
                    className="form-control input-sm"
                  />
                </HorizontalFormGroup>
              }
              <HorizontalFormGroup label="Unit">
                <Field
                  name="connectedData.unit"
                  component={InputField}
                  type="text"
                  className="form-control input-sm"
                />
                {axes &&
                  <p
                    style={{ fontSize: '0.9em', paddingTop: '2px' }}
                  >
                    { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
                  </p>
                }
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Convert">
                From
                <Field
                  name="connectedData.convertFrom"
                  type="text"
                  className="form-control input-sm"
                  component={InputField}
                />
                To
                <Field
                  name="connectedData.convertTo"
                  type="text"
                  className="form-control input-sm"
                  component={InputField}
                />
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Axis">
                <Field
                  name="connectedData.axisId"
                  clearable={false}
                  component={ReactSelectField}
                  options={connectedDataUnitFilteredAxis}
                />
                {
                  noCorrespondingAxis &&
                  <span className="text-danger">No corresponding axis-unit pair, create it or change it</span>
                }
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Domain">
                <Field
                  name="connectedData.domain"
                  clearable={false}
                  component={ReactSelectField}
                  options={domains.map(d =>
                    ({
                      label: d.name,
                      value: d.name,
                    })
                  ).concat({
                    label: '*',
                    value: '*',
                  })}
                />
              </HorizontalFormGroup>
            </div>
          }


          <HorizontalFormGroup label="Timeline">
            <Field
              name="connectedData.timeline"
              clearable={false}
              component={ReactSelectField}
              options={availableTimelines}
            />
            {
              noCorrespondingTimeline &&
              <span className="text-danger">No corresponding timeline, create it or change it</span>
            }
          </HorizontalFormGroup>
          <FieldArray
            name="connectedData.filter"
            component={FiltersFields}
          />
        </div>
      </Form>
    );
  }
}

EntryPointConnectedData.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  initialValues: PropTypes.shape().isRequired,
  axes: PropTypes.shape({}).isRequired,
  timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool.isRequired,
  axisId: PropTypes.string,
  xAxisId: PropTypes.string,
  yAxisId: PropTypes.string,
  unitX: PropTypes.string,
  unitY: PropTypes.string,
  unit: PropTypes.string,
  timeline: PropTypes.string,
  parametric: PropTypes.bool,
  stringParameter: PropTypes.bool,
  domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

EntryPointConnectedData.defaultProps = {
  submitting: false,
  parametric: false,
  axisId: null,
  xAxisId: null,
  yAxisId: null,
  unitX: null,
  unitY: null,
  unit: null,
  timeline: null,
  stringParameter: false,
};

const requiredFields = [
  // 'fieldX',
  // 'formula',
  // 'timeline',
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
  validate,
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        parametric: selector(state, 'parametric'),
        axisId: selector(state, 'connectedData.axisId') || _get(props, 'initialValues.connectedData.axisId'),
        timeline: _get(props, 'initialValues.connectedData.timeline'),
        stringParameter: selector(state, 'connectedData.stringParameter'),
        unit: selector(state, 'connectedData.unit') || _get(props, 'initialValues.connectedData.unit'),
        unitX: selector(state, 'connectedDataParametric.unitX') || _get(props, 'initialValues.connectedDataParametric.unitX'),
        unitY: selector(state, 'connectedDataParametric.unitY') || _get(props, 'initialValues.connectedDataParametric.unitY'),
        xAxisId: selector(state, 'connectedDataParametric.xAxisId') || _get(props, 'initialValues.connectedDataParametric.xAxisId'),
        yAxisId: selector(state, 'connectedDataParametric.yAxisId') || _get(props, 'initialValues.connectedDataParametric.yAxisId'),
      };
    }
  )(EntryPointConnectedData)
);
