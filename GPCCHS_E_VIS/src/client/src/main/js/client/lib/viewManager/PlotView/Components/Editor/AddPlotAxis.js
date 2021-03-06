// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : axis edition: tickStep property cannot be
//  float, always int.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Plot axis edition general revision. Fields
//  min, max and tickStep are stored in store as float, float, int, but handled in ReduxForm as
//  strings.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 20/06/2017 : Axis validation: max cannot be inferior to
//  min.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 20/06/2017 : Resolving minus issue on PlotView axis editor
//  using inputs type="text" and not input type="number"
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and
//  documents.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 1.1.2 : FA : #7377 : 01/08/2017 : Fix plot axes in editor
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './Plot.css';
import { validateRequiredFields } from '../../../common';

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
        <ErrorBoundary>
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
        </ErrorBoundary>
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
        <HorizontalFormGroup label="Format as date">
          <Field
            name="formatAsDate"
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
              normalize={val => parseFloat(val).toString()}
              type="number"
              step="any"
              min="1"
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

  return {
    ...errors,
    ...validateRequiredFields(requiredFields, values),
  };
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
