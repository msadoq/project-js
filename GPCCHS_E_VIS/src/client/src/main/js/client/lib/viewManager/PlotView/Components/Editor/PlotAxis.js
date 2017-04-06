import React, { PropTypes, PureComponent } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';
import FormSectionFontStyle from '../../../commonEditor/FormSections/FormSectionFontStyle';
import styles from './Plot.css';

class PlotAxis extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      label: PropTypes.string,
      unit: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      autoLimits: PropTypes.bool,
      tickStep: PropTypes.number,
      autoTick: PropTypes.bool,
      showTicks: PropTypes.bool,
      isLogarithmic: PropTypes.bool,
      showAxis: PropTypes.bool,
      showLabels: PropTypes.bool,
      style: PropTypes.object,
    }).isRequired,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    autoLimits: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
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
    })).isRequired,
  }

  static defaultProps = {
    showTicks: false,
    autoTick: false,
    autoLimits: false,
  };

  componentDidMount() {
    if (!this.props.initialValues) {
      this.handleInitialize();
    }
  }

  memoizeStyle = _memoize((color => ({ backgroundColor: color })))

  handleInitialize() {
    const initData = {
      label: '',
      unit: '',
      min: 0,
      max: 0,
      autoLimits: true,
      tickStep: 1,
      autoTick: true,
      showTicks: true,
      isLogarithmic: false,
      showAxis: true,
      style: {
        font: 'Arial',
        size: 12,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        align: 'left',
        color: '#000000',
      },
    };

    this.props.initialize(initData);
  }

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
        <Form horizontal onSubmit={handleSubmit}>
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
                normalize={value => parseFloat(value)}
                className="form-control input-sm"
                type="number"
                step="any"
              />
            </HorizontalFormGroup>
          }
          <ClearSubmitButtons
            pristine={pristine}
            submitting={submitting}
            reset={reset}
            valid={valid}
          />
        </Form>
      );
    }

    return (
      <Form horizontal onSubmit={handleSubmit}>
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
              type="number"
            />
          </HorizontalFormGroup>
        }
        { !autoLimits &&
          <HorizontalFormGroup label="Max">
            <Field
              name="max"
              component={InputField}
              className="form-control input-sm"
              type="number"
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
              normalize={value => parseFloat(value)}
              className="form-control input-sm"
              type="number"
              step="any"
            />
          </HorizontalFormGroup>
        }

        <HorizontalFormGroup label="Logarithmic">
          <Field
            name="isLogarithmic"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
      </Form>
    );
  }
}

const requiredFields = ['label'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default connect((state, { form }) => {
  const showTicks = formValueSelector(form)(state, 'showTicks');
  const autoTick = formValueSelector(form)(state, 'autoTick');
  const autoLimits = formValueSelector(form)(state, 'autoLimits');
  const label = formValueSelector(form)(state, 'label');
  return {
    showTicks,
    autoTick,
    autoLimits,
    label,
  };
})(
  reduxForm({
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(PlotAxis)
);
