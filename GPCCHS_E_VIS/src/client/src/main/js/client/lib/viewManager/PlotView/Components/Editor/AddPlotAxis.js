import React, { PropTypes, PureComponent } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import FormSectionFontStyle from 'viewManager/commonEditor/FormSections/FormSectionFontStyle';
import styles from './Plot.css';

class AddPlotAxis extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      label: PropTypes.string,
      unit: PropTypes.string,
      min: PropTypes.string,
      max: PropTypes.string,
      autoLimits: PropTypes.bool,
      tickStep: PropTypes.string,
      autoTick: PropTypes.bool,
      showTicks: PropTypes.bool,
      logarithmic: PropTypes.bool,
      showAxis: PropTypes.bool,
      showLabels: PropTypes.bool,
      style: PropTypes.object,
    }).isRequired,
    showTicks: PropTypes.bool,
    logarithmic: PropTypes.bool,
    autoTick: PropTypes.bool,
    autoLimits: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    axisId: PropTypes.string,
    entryPoints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      connectedData: PropTypes.shape({
        axisId: PropTypes.string,
        digit: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
        format: PropTypes.string,
        formula: PropTypes.string,
        fieldX: PropTypes.string,
        timeline: PropTypes.string,
        unit: PropTypes.string,
      }),
    })),
  }

  static defaultProps = {
    showTicks: false,
    autoTick: false,
    logarithmic: false,
    autoLimits: false,
    axisId: null,
    entryPoints: [],
  };

  memoizeStyle = _memoize((color => ({ backgroundColor: color })))

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      showTicks,
      autoTick,
      autoLimits,
      entryPoints,
      axisId,
      initialValues,
      logarithmic,
    } = this.props;

    const relatedEntryPoints = [];
    (entryPoints || []).forEach((ep) => {
      if (_get(ep, ['connectedData', 'axisId']) === axisId) {
        relatedEntryPoints.push(
          <span
            key={ep.name}
            className={classnames('label', 'label-default', styles.relatedEntryPoint)}
            style={this.memoizeStyle(_get(ep, ['objectStyle', 'curveColor'], '#333'))}
          >
            {ep.name}<br />
          </span>
        );
      }
    });

    if (axisId === 'time') {
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
          {
            relatedEntryPoints.length ?
              <div>
                <div className="page-header">
                  <h4>Linked entry points</h4>
                </div>
                {relatedEntryPoints}
              </div>
              : null
          }
          <div className="page-header">
            <h4>Name and Unit</h4>
          </div>
          <HorizontalFormGroup label="Label">
            <span>{initialValues.label}</span>
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Unit">
            <span>{initialValues.unit}</span>
          </HorizontalFormGroup>
          <div className="page-header">
            <h4>Style</h4>
          </div>
          <FormSectionFontStyle name="style" />
          <div className="page-header">
            <h4>Parameters</h4>
          </div>
          <HorizontalFormGroup label="Show ticks">
            <Field
              name="showTicks"
              component={ButtonToggleField}
              styleOff="warning"
            />
          </HorizontalFormGroup>
          { showTicks &&
            <HorizontalFormGroup label="Auto Tick">
              <Field
                name="autoTick"
                component={ButtonToggleField}
                styleOff="warning"
              />
            </HorizontalFormGroup>
          }
          { showTicks && !autoTick &&
            <HorizontalFormGroup label="Tick step (ms)">
              <Field
                name="tickStep"
                component={InputField}
                className="form-control input-sm"
                normalize={val => parseInt(val, 10).toString()}
                type="number"
                step="any"
              />
            </HorizontalFormGroup>
          }
        </Form>
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
        {
          relatedEntryPoints.length ?
            <div>
              <div className="page-header">
                <h4>Linked entry points</h4>
              </div>
              {relatedEntryPoints}
            </div>
            : null
        }
        <div className="page-header">
          <h4>Name and Unit</h4>
        </div>
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>
        <div className="page-header">
          <h4>Style</h4>
        </div>
        <FormSectionFontStyle name="style" />

        <div className="page-header">
          <h4>Parameters</h4>
        </div>
        <HorizontalFormGroup label="Show">
          <Field
            name="showAxis"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Show labels">
          <Field
            name="showLabels"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Auto Limit">
          <Field
            name="autoLimits"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        { !autoLimits &&
          <HorizontalFormGroup label="Min">
            <Field
              name="min"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>
        }
        { !autoLimits &&
          <HorizontalFormGroup label="Max">
            <Field
              name="max"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>
        }

        <HorizontalFormGroup label="Show ticks">
          <Field
            name="showTicks"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        { showTicks &&
          <HorizontalFormGroup label="Auto Tick">
            <Field
              name="autoTick"
              component={ButtonToggleField}
              styleOff="warning"
            />
          </HorizontalFormGroup>
        }
        { showTicks && !autoTick &&
          <HorizontalFormGroup label="Tick step">
            <Field
              name="tickStep"
              component={InputField}
              className="form-control input-sm"
              normalize={val => parseInt(val, 10).toString()}
              type="number"
              step="any"
            />
          </HorizontalFormGroup>
        }

        <HorizontalFormGroup label="Logarithmic">
          <Field
            name="logarithmic"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>
        {
          logarithmic &&
          <div
            style={{
              padding: 6,
              marginBottom: 5,
              borderRadius: 3,
              border: '1px solid #CCC',
            }}
          >
            <HorizontalFormGroup label="Logarithm min">
              <Field
                name="logSettings.min"
                component={InputField}
                className="form-control input-sm"
                type="text"
              />
            </HorizontalFormGroup>
            <HorizontalFormGroup label="Logarithm max">
              <Field
                name="logSettings.max"
                component={InputField}
                className="form-control input-sm"
                type="text"
              />
            </HorizontalFormGroup>
            <HorizontalFormGroup label="Logarithm base">
              <Field
                name="logSettings.base"
                component={InputField}
                className="form-control input-sm"
                type="number"
              />
            </HorizontalFormGroup>
          </div>
        }
      </Form>
    );
  }
}

const requiredFields = ['label'];
const validate = (values = {}, props) => {
  const errors = {};
  if (
    Object.keys(props.axes).find(key => props.axes[key].label === values.label) &&
    !props.axisId // form used for creation and not edition
  ) {
    errors.label = 'Label already taken';
  }
  if (values.max && parseFloat(values.max).toString().length !== values.max.length) {
    errors.max = 'Invalid value';
  }
  if (values.min && parseFloat(values.min).toString().length !== values.min.length) {
    errors.min = 'Invalid value';
  }
  if (!errors.max && parseFloat(values.max) <= parseFloat(values.min)) {
    errors.max = 'Max cannot be inferior to min';
  }

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export default connect(
  (state, { form }) =>
    ({
      showTicks: formValueSelector(form)(state, 'showTicks'),
      autoTick: formValueSelector(form)(state, 'autoTick'),
      autoLimits: formValueSelector(form)(state, 'autoLimits'),
      label: formValueSelector(form)(state, 'label'),
      logarithmic: formValueSelector(form)(state, 'logarithmic'),
    })
  )(
    reduxForm({
      validate,
      enableReinitialize: true,
      keepDirtyOnReinitialize: true,
    })(AddPlotAxis)
  );
