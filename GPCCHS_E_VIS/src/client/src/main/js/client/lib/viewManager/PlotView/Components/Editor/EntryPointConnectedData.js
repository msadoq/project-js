// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : PlotView EntryPoint refacto: connectedData instead
//  of connectedDataX and connectedDataY.
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView.
//  Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y
//  axis.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list
//  of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : FA : ISIS-FT-1945 : 22/05/2017 : Remove required fields in editor to allow
//  view model creation from editor
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by
//  calling this.props.reset() onMount.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Added "connectedDataParametric" key to EntryPoints
//  in PlotViews JSON files, EntryPoints can be parametric or not. Updated PlotView's editor
//  accordingly.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Added domainX and domainY to PlotView EntryPoint's
//  connectedDataParametric.
// VERSION : 2.0.0 : FA : #7874 : 25/09/2017 : Plot/Text/Mimic editor now displays when EP's
//  timeline has no corresponding timeline, same thing with Plot's EP's axes.
// VERSION : 2.0.0 : FA : #8045 : 06/11/2017 : PlotView can draw string parameters, and a defaultY
//  property can be set.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add unit convertion for plotview
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 01/02/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix provider field initialization in
//  PlotEditor entry point form
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix provider field in entry point form in
//  plot editor
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix provider field for MimicView
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Improve single unit retrieval .
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Fix entry point unit retrieval
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
// END-HISTORY
// ====================================================================

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

import { getPageIdByViewId } from 'store/reducers/pages';

import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import TextareaField from 'windowProcess/commonReduxForm/TextareaField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import FiltersFields from 'viewManager/commonEditor/Fields/FiltersFields';
import ProviderFieldContainer from 'viewManager/commonEditor/Fields/ProviderFieldContainer';

import {
  getTupleId,
} from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askUnit as askUnitAction } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';

import styles from './EntryPointConnectedData.css';
import parseFormula from '../../../commonData/formula';

const wildcardCharacter = get('WILDCARD_CHARACTER');


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

  componentWillReceiveProps(nextProps) {
    const {
      domainId,
      sessionId,
      catalog,
      catalogItem,
      askUnit,
    } = nextProps;

    if (
      domainId !== null &&
      sessionId !== null &&
      catalog !== null &&
      catalogItem !== null
    ) {
      askUnit(domainId, sessionId, catalog, catalogItem);
    }
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
        }));
    }

    const noCorrespondingAxis = !filteredAxes.find(axis => axis.id === axisId);
    filteredAxes = filteredAxes
      .map(axis => ({
        label: axis.label,
        value: axis.axisId,
      }))
      .concat({
        label: '-',
        value: '-',
      });
    if (noCorrespondingAxis) {
      filteredAxes = filteredAxes
        .concat({ label: axisId, value: axisId, disabled: true });
    }

    let connectedDataParametricFilteredAxisX = [...filteredAxes];
    let connectedDataParametricFilteredAxisY = [...filteredAxes];
    let noCorrespondingAxisX = false;
    let noCorrespondingAxisY = false;
    if (parametric) {
      // X
      noCorrespondingAxisX = !connectedDataParametricFilteredAxisX
        .find(axis => axis.value === xAxisId);
      connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
        .map(axis => ({
          label: axis.label,
          value: axis.value,
        }));
      if (noCorrespondingAxisX && xAxisId !== '-') {
        connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
          .concat({ label: xAxisId, value: xAxisId, disabled: true });
      }
      // Y
      noCorrespondingAxisY = !connectedDataParametricFilteredAxisY
        .find(axis => axis.value === yAxisId);
      connectedDataParametricFilteredAxisY = connectedDataParametricFilteredAxisY
        .map(axis => ({
          label: axis.label,
          value: axis.value,
        }));
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
      )
        .concat({
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
                <HorizontalFormGroup label="Axis X">
                  <Field
                    name="connectedDataParametric.xAxisId"
                    clearable={false}
                    component={ReactSelectField}
                    options={connectedDataParametricFilteredAxisX}
                  />
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
                    )
                      .concat({
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
                <HorizontalFormGroup label="Axis Y">
                  <Field
                    name="connectedDataParametric.yAxisId"
                    clearable={false}
                    component={ReactSelectField}
                    options={connectedDataParametricFilteredAxisY}
                  />
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
                    )
                      .concat({
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
                <br />
                <div>
                  {unit}
                </div>
                <br />
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Convert from">
                <Field
                  name="connectedData.convertFrom"
                  type="text"
                  className="form-control input-sm"
                  component={InputField}
                />
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Convert to">
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
                  options={filteredAxes}
                />
                {
                  noCorrespondingAxis &&
                  <span className="text-danger">No corresponding axis, create it or change it</span>
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
                  )
                    .concat({
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

          <HorizontalFormGroup label="Provider">
            <ProviderFieldContainer />
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
  unit: PropTypes.string,
  timeline: PropTypes.string,
  parametric: PropTypes.bool,
  stringParameter: PropTypes.bool,
  domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entryPoint: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
  domainId: PropTypes.number,
  sessionId: PropTypes.number,
  catalog: PropTypes.string,
  catalogItem: PropTypes.string,
  askUnit: PropTypes.func,
};

EntryPointConnectedData.defaultProps = {
  submitting: false,
  parametric: false,
  axisId: null,
  xAxisId: null,
  yAxisId: null,
  unit: null,
  timeline: null,
  stringParameter: false,
  entryPoint: null,
  domainId: null,
  sessionId: null,
  catalog: null,
  catalogItem: null,
  askUnit: () => {
  },
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

const getUnitParams = (state, viewId, connectedData) => {
  const pageId = getPageIdByViewId(state, { viewId });

  const {
    domain,
    timeline,
    formula,
  } = connectedData;

  const domainSelected = getDomainByNameWithFallback(state, { domainName: domain, viewId, pageId });
  const domainId = domainSelected ? domainSelected.domainId : null;
  const timelineSelected = getTimelineById(state, { timelineId: timeline });
  let sessionName = null;
  if (timelineSelected && timelineSelected.sessionName) {
    sessionName = timelineSelected.sessionName;
  } else if (timeline === wildcardCharacter) {
    sessionName = wildcardCharacter;
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;
  const tupleId = getTupleId(domainId, sessionId);

  if (!formula) {
    return {
      domainId,
      sessionId,
      unit: 'Unknown',
    };
  }

  const {
    catalog,
    parameterName: catalogItem,
  } = parseFormula(formula);

  const unit = _get(state.catalogs, ['units', tupleId, catalog, catalogItem], 'Unknown');

  return {
    domainId,
    sessionId,
    catalog,
    catalogItem,
    unit,
  };
};

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.form);

  let unitParams = null;

  if (props.entryPoint && props.entryPoint.connectedData) {
    unitParams = getUnitParams(state, props.viewId, props.entryPoint.connectedData);
  }

  return {
    parametric: selector(state, 'parametric'),
    axisId: selector(state, 'connectedData.axisId') || _get(props, 'initialValues.connectedData.axisId'),
    timeline: _get(props, 'initialValues.connectedData.timeline'),
    stringParameter: selector(state, 'connectedData.stringParameter'),
    provider: selector(state, 'provider') || _get(props, 'initialValues.connectedData.provider'),
    unitX: selector(state, 'connectedDataParametric.unitX') || _get(props, 'initialValues.connectedDataParametric.unitX'),
    unitY: selector(state, 'connectedDataParametric.unitY') || _get(props, 'initialValues.connectedDataParametric.unitY'),
    xAxisId: selector(state, 'connectedDataParametric.xAxisId') || _get(props, 'initialValues.connectedDataParametric.xAxisId'),
    yAxisId: selector(state, 'connectedDataParametric.yAxisId') || _get(props, 'initialValues.connectedDataParametric.yAxisId'),
    ...unitParams,
  };
};

const mapDispatchToProps = dispatch => ({
  askUnit: (domainId, sessionId, catalog, catalogItem) => {
    dispatch(askUnitAction(domainId, sessionId, catalog, catalogItem));
  },
});

export default reduxForm({
  validate,
  enableReinitialize: true,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EntryPointConnectedData)
);
