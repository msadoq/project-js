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
// VERSION : 2.0.0.3 : FA : ISIS-FT-3180 : 25/05/2018 : no more unit selection request on adding
//  new entry point
// VERSION : 2.0.0.3 : FA : ISIS-FT-3181 : 29/05/2018 : parametric plot settings editor in order
//  again
// VERSION : 2.0.0.3 : FA : ISIS-FT-3181 : 29/05/2018 : unitX and unitY ignored in
//  EntryPointConnectedData
// VERSION : 2.0.0.3 : FA : ISIS-FT-3180 : 30/05/2018 : no more unit selection request on adding
//  new entry point
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import {
  Field,
} from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import TextareaField from 'windowProcess/commonReduxForm/TextareaField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import ProviderFieldContainer from 'viewManager/commonEditor/Fields/ProviderFieldContainer';
import CatalogFieldContainer from 'viewManager/commonEditor/Fields/CatalogFieldContainer';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import ComObjectFieldContainer from 'viewManager/commonEditor/Fields/ComObjectFieldContainer';
import DataTypeField from 'viewManager/commonEditor/Fields/DataTypeField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './EntryPointConnectedData.css';

export const getFilteredAxes = ({ axes, unitX, unitY, unit, xAxisId, yAxisId, axisId }) => (
  axes
    ? Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axisId: key,
      }))
      .filter(axis =>
        [unitX, unitY, unit].includes(axis.unit) ||
        axis.id === xAxisId || axis.id === yAxisId || axis.id === axisId
      )
    : []
);

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedData extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    axes: PropTypes.shape({}).isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    selectedDomainName: PropTypes.string,
    selectedTimelineId: PropTypes.string,
    selectedCatalogName: PropTypes.string,
    selectedItemName: PropTypes.string,
    selectedComObjectName: PropTypes.string,
    entryPoint: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
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
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
    selectedComObjectName: null,
    entryPoint: null,
  };

  state = {
    parametric: this.props.parametric,
  };

  getAvailableTimelines = (noCorrespondingTimeline, timeline) => {
    const { timelines } = this.props;
    return timelines ? timelines.map(t =>
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
        )
      : [];
  };

  getNoCorrespondingAxisX = (connectedDataParametricFilteredAxisX) => {
    const { parametric } = this.state;
    const { xAxisId } = this.props;
    return parametric && !connectedDataParametricFilteredAxisX.find(axis => axis.id === xAxisId);
  };

  getNoCorrespondingAxisY = (connectedDataParametricFilteredAxisY) => {
    const { parametric } = this.state;
    const { yAxisId } = this.props;
    return parametric && !connectedDataParametricFilteredAxisY.find(axis => axis.id === yAxisId);
  };

  render() {
    const {
      axes,
      unitX,
      unitY,
      xAxisId,
      yAxisId,
      timelines,
      domains,
      pageId,
      viewId,
      stringParameter,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
      selectedComObjectName,
      entryPoint,
    } = this.props;
    const unit = _.getOr(null, ['connectedData', 'unit'], entryPoint);
    const axisId = _.getOr(null, ['connectedData', 'axisId'], entryPoint);
    const timeline = _.getOr(null, ['connectedData', 'timeline'], entryPoint);
    const { parametric } = this.state;

    const filteredAxes =
      getFilteredAxes({ axes, unitX, unitY, unit, xAxisId, yAxisId, axisId });

    // Determine elligible axes : must match the unit
    let connectedDataUnitFilteredAxis = filteredAxes.filter(a => a.unit === unit);
    const noCorrespondingAxis = !connectedDataUnitFilteredAxis.find(axis => axis.id === axisId);
    connectedDataUnitFilteredAxis = connectedDataUnitFilteredAxis
      .map(axis => ({
        label: axis.label,
        value: axis.axisId,
      }))
      .concat({
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
    const noCorrespondingAxisX = this.getNoCorrespondingAxisX(connectedDataParametricFilteredAxisX);
    const noCorrespondingAxisY = this.getNoCorrespondingAxisY(connectedDataParametricFilteredAxisY);
    if (parametric) {
      // X
      connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
        .map(axis => ({
          label: axis.label,
          value: axis.axisId,
        }))
        .concat({
          label: '-',
          value: '-',
        });
      if (noCorrespondingAxisX && xAxisId !== '-') {
        connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
          .concat({ label: xAxisId, value: xAxisId, disabled: true });
      }
      // Y
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

    const noCorrespondingTimeline = !timelines.find(t => t.id === timeline) && timeline !== '*';
    const availableTimelines = this.getAvailableTimelines(noCorrespondingTimeline, timeline);

    return (
      <ErrorBoundary>
        <React.Fragment>
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
                    {Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ')}
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
                    {Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ')}
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
                  {Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ')}
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

          <HorizontalFormGroup label="Data type">
            <DataTypeField />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Catalog">
            <CatalogFieldContainer
              domainName={selectedDomainName}
              timelineId={selectedTimelineId}
              viewId={viewId}
              pageId={pageId}
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Catalog item">
            <CatalogItemFieldContainer
              domainName={selectedDomainName}
              timelineId={selectedTimelineId}
              catalogName={selectedCatalogName}
              viewId={viewId}
              pageId={pageId}
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Com object">
            <ComObjectContainer
              domainName={selectedDomainName}
              timelineId={selectedTimelineId}
              catalogName={selectedCatalogName}
              itemName={selectedItemName}
              viewId={viewId}
              pageId={pageId}
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Com object Field">
            <ComObjectFieldContainer
              domainName={selectedDomainName}
              timelineId={selectedTimelineId}
              catalogName={selectedCatalogName}
              itemName={selectedItemName}
              comObjectName={selectedComObjectName}
            />
          </HorizontalFormGroup>


          <HorizontalFormGroup label="Provider">
            <ProviderFieldContainer />
          </HorizontalFormGroup>

        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

export default EntryPointConnectedData;
