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

export const getFilteredAxes = ({ axes }) => (
  axes
    ? Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axisId: key,
      }))
    : []
);

const displayModeOptions = () => [
  { label: 'classic', value: 0 },
  { label: 'rising edge', value: 1 },
  { label: 'falling edge', value: 2 },
];
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
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    selectedDomainName: PropTypes.string,
    selectedTimelineId: PropTypes.string,
    selectedCatalogName: PropTypes.string,
    selectedItemName: PropTypes.string,
    selectedComObjectName: PropTypes.string,
    // parametric X
    parametricXSelectedDomainName: PropTypes.string,
    parametricXSelectedComObjectName: PropTypes.string,
    parametricXSelectedCatalogName: PropTypes.string,
    parametricXSelectedItemName: PropTypes.string,
    // parametric Y
    parametricYSelectedDomainName: PropTypes.string,
    parametricYSelectedComObjectName: PropTypes.string,
    parametricYSelectedCatalogName: PropTypes.string,
    parametricYSelectedItemName: PropTypes.string,
    entryPoint: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
    submitting: false,
    parametric: false,
    axisId: null,
    // xAxisId: null,
    // yAxisId: null,
    displayMode: 0,
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
    selectedComObjectName: null,
    // parametric X
    parametricXSelectedDomainName: null,
    parametricXSelectedTimelineId: null,
    parametricXSelectedComObjectName: null,
    parametricXSelectedCatalogName: null,
    parametricXSelectedItemName: null,
    // parametric Y
    parametricYSelectedDomainName: null,
    parametricYSelectedTimelineId: null,
    parametricYSelectedComObjectName: null,
    parametricYSelectedCatalogName: null,
    parametricYSelectedItemName: null,
    entryPoint: null,
  };

  state = {
    parametric: _.getOr(false, ['entryPoint', 'parametric'], this.props),
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

  getParametricForm = (
    parametricSelectedDomainName,
    parametricSelectedTimelineId,
    parametricSelectedComObjectName,
    parametricSelectedCatalogName,
    parametricSelectedItemName,
    pageId,
    viewId,
    availableTimelines,
    domains,
    connectedDataParametricFilteredAxis,
    noCorrespondingAxis,
    axe
  ) => (
    <div className={axe === 'X' ? styles.xDiv : styles.yDiv}>
      <h4>{axe}</h4>
      <HorizontalFormGroup label="Domain">
        <Field
          name={`connectedDataParametric.domain${axe}`}
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
          validate={(value) => {
            if (value === '') {
              return 'Domain is required';
            }

            return undefined;
          }}
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Axis">
        <Field
          name={`connectedDataParametric.${axe.toLowerCase()}AxisId`}
          clearable={false}
          component={ReactSelectField}
          options={connectedDataParametricFilteredAxis}
        />
        {
          noCorrespondingAxis &&
          <span className="text-danger">No corresponding axis, create it or change it</span>
        }
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Data type">
        <DataTypeField />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Catalog">
        <CatalogFieldContainer
          name={`connectedDataParametric.catalog${axe}`}
          domainName={parametricSelectedDomainName}
          timelineId={parametricSelectedTimelineId}
          viewId={viewId}
          pageId={pageId}
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Catalog item">
        <CatalogItemFieldContainer
          name={`connectedDataParametric.catalogItem${axe}`}
          domainName={parametricSelectedDomainName}
          timelineId={parametricSelectedTimelineId}
          catalogName={parametricSelectedCatalogName}
          viewId={viewId}
          pageId={pageId}
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Com object">
        <ComObjectContainer
          name={`connectedDataParametric.comObject${axe}`}
          domainName={parametricSelectedDomainName}
          timelineId={parametricSelectedTimelineId}
          catalogName={parametricSelectedCatalogName}
          itemName={parametricSelectedItemName}
          viewId={viewId}
          pageId={pageId}
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Com object Field">
        <ComObjectFieldContainer
          name={`connectedDataParametric.comObjectField${axe}`}
          domainName={parametricSelectedDomainName}
          timelineId={parametricSelectedTimelineId}
          catalogName={parametricSelectedCatalogName}
          itemName={parametricSelectedItemName}
          comObjectName={parametricSelectedComObjectName}
        />
      </HorizontalFormGroup>
    </div>
  );

  hangleToggleParametric = () => {
    this.setState({ parametric: !this.state.parametric });
  };

  render() {
    const {
      axes,
      // xAxisId,
      // yAxisId,
      timelines,
      domains,
      pageId,
      viewId,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
      selectedComObjectName,
      parametricXSelectedDomainName,
      parametricXSelectedComObjectName,
      parametricXSelectedCatalogName,
      parametricXSelectedItemName,
      // Y
      parametricYSelectedDomainName,
      parametricYSelectedComObjectName,
      parametricYSelectedCatalogName,
      parametricYSelectedItemName,
      entryPoint,
    } = this.props;

    const axisId = _.getOr(null, ['connectedData', 'axisId'], entryPoint);
    const timeline = _.getOr(null, ['connectedData', 'timeline'], entryPoint);
    const {
      parametric,
    } = this.state;

    let filteredAxes = getFilteredAxes({ axes });

    // Determine elligible axes : must match the unit
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

    // Determine elligible axes for X and Y : must match the unit
    // let connectedDataParametricFilteredAxisX = filteredAxes;
    // let connectedDataParametricFilteredAxisY = filteredAxes;
    // const noCorrespondingAxisX = this.getNoCorrespondingAxisX(connectedDataParametricFilteredAxisX);
    // const noCorrespondingAxisY = this.getNoCorrespondingAxisY(connectedDataParametricFilteredAxisY);
    // if (parametric) {
    //   // X
    //   connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
    //     .map(axis => ({
    //       label: axis.label,
    //       value: axis.axisId,
    //     }));
    //   if (noCorrespondingAxisX && xAxisId !== '-') {
    //     connectedDataParametricFilteredAxisX = connectedDataParametricFilteredAxisX
    //       .concat({ label: xAxisId, value: xAxisId, disabled: true });
    //   }
    //   // Y
    //   connectedDataParametricFilteredAxisY = connectedDataParametricFilteredAxisY
    //     .map(axis => ({
    //       label: axis.label,
    //       value: axis.axisId,
    //     }));
    //   if (noCorrespondingAxisY && yAxisId !== '-') {
    //     connectedDataParametricFilteredAxisY = connectedDataParametricFilteredAxisY
    //       .concat({ label: yAxisId, value: yAxisId, disabled: true });
    //   }
    // }

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
              onChange={this.hangleToggleParametric}
            />
          </HorizontalFormGroup>
          {
            parametric &&
            <HorizontalFormGroup label="Timeline">
              <Field
                name="connectedData.timeline"
                clearable={false}
                component={ReactSelectField}
                options={availableTimelines}
                validate={(value) => {
                  if (value === '') {
                    return 'Timeline is required';
                  }

                  return undefined;
                }}
              />
            </HorizontalFormGroup>
          }
          {
            parametric &&
            this.getParametricForm(
              parametricXSelectedDomainName,
              selectedTimelineId,
              parametricXSelectedComObjectName,
              parametricXSelectedCatalogName,
              parametricXSelectedItemName,
              pageId,
              viewId,
              availableTimelines,
              domains,
              filteredAxes,
              noCorrespondingAxis,
              'X'
            )
          }
          {
            parametric &&
            this.getParametricForm(
              parametricYSelectedDomainName,
              selectedTimelineId,
              parametricYSelectedComObjectName,
              parametricYSelectedCatalogName,
              parametricYSelectedItemName,
              pageId,
              viewId,
              availableTimelines,
              domains,
              filteredAxes,
              noCorrespondingAxis,
              'Y'
            )
          }
          {
            parametric &&
            <HorizontalFormGroup label="Provider">
              <ProviderFieldContainer />
            </HorizontalFormGroup>
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

              <HorizontalFormGroup label="Display mode">
                <Field
                  name="connectedData.displayMode"
                  component={ReactSelectField}
                  options={displayModeOptions()}
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
                  ).concat({
                    label: '*',
                    value: '*',
                  })}
                  validate={(value) => {
                    if (value === '') {
                      return 'Domain is required';
                    }

                    return undefined;
                  }}
                />
              </HorizontalFormGroup>
              <HorizontalFormGroup label="Timeline">
                <Field
                  name="connectedData.timeline"
                  clearable={false}
                  component={ReactSelectField}
                  options={availableTimelines}
                  validate={(value) => {
                    if (value === '') {
                      return 'Timeline is required';
                    }

                    return undefined;
                  }}
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
            </div>
          }
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

export default EntryPointConnectedData;
