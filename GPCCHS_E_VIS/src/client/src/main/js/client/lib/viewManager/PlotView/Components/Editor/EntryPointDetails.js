// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : PlotView editor: Time based data : unit x: 's',
//  axisId: 'time', auto values. Display non-editable values.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : PlotView EntryPoint refacto: connectedData instead
//  of connectedDataX and connectedDataY.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list
//  of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes
//  on Plot and Text editors too.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Added "connectedDataParametric" key to EntryPoints
//  in PlotViews JSON files, EntryPoints can be parametric or not. Updated PlotView's editor
//  accordingly.
// VERSION : 1.1.2 : DM : #6835 : 12/09/2017 : Fixed two lint errors in PlotView Editor and View.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView
//  EntryPoint's name.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // l'utilisateur doit
//  pouvoir choisir avec ou sans ligne entre les points sans "tricher" en mettant Line size = 0
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix provider field initialization in
//  PlotEditor entry point form
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Fix entry point unit retrieval
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import Collapse from 'rc-collapse';
import EntryPointStateColors from 'viewManager/commonEditor/EntryPoint/EntryPointStateColors';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';
import { entryPointType } from '../../../common/Components/types';
import FiltersFieldsContainer from '../../../commonEditor/Fields/FiltersFieldsContainer';

const { Panel } = Collapse;
const emptyArray = [];

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    axes: PropTypes.shape({}).isRequired,
    entryPoint: entryPointType.isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    form: PropTypes.string.isRequired,
    selectedDomainName: PropTypes.string,
    selectedTimelineId: PropTypes.string,
    selectedCatalogName: PropTypes.string,
    selectedItemName: PropTypes.string,
    selectedComObjectName: PropTypes.string,

  };

  static defaultProps = {
    panels: [],
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
    selectedComObjectName: null,
  };

  onChange = (openPanels) => {
    const {
      updateViewSubPanels,
      viewId,
      entryPoint,
    } = this.props;
    updateViewSubPanels(viewId, 'entryPoints', entryPoint.id, openPanels);
  };

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;

    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
    });
  };

  handleObjectParametersSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      objectStyle: values,
      name: values.name,
      displayLine: values.displayLine,
      displayPoints: values.displayPoints,
    });
  };

  handleConnectedDataSubmit = (values) => {
    const {
      entryPoint,
      updateEntryPoint,
      viewId,
    } = this.props;

    updateEntryPoint(
      viewId,
      entryPoint.id,
      {
        ...entryPoint,
        parametric: values.parametric,
        connectedDataParametric: values.connectedDataParametric,
      }
    );
  };

  render() {
    const {
      entryPoint,
      pageId,
      viewId,
      axes,
      timelines,
      panels,
      domains,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
      selectedComObjectName,
    } = this.props;

    // TODO Rerender (new ref)
    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={panels === true ? emptyArray : panels}
        >
          <Panel
            key="parameters"
            header="Parameters"
          >
            {Array.isArray(panels) && panels.includes('parameters') && <EntryPointParameters
              onSubmit={this.handleObjectParametersSubmit}
              entryPoint={entryPoint}
            />}
          </Panel>

          <Panel
            key="coordinates"
            header="Coordinates"
          >
            {Array.isArray(panels) && panels.includes('coordinates') && <EntryPointConnectedData
              axes={axes}
              timelines={timelines}
              domains={domains}
              viewId={viewId}
              pageId={pageId}
              onSubmit={this.handleConnectedDataSubmit}

              form={this.props.form}
              entryPoint={entryPoint}
              selectedDomainName={selectedDomainName}
              selectedTimelineId={selectedTimelineId}
              selectedCatalogName={selectedCatalogName}
              selectedItemName={selectedItemName}
              selectedComObjectName={selectedComObjectName}
            />}
          </Panel>

          <Panel
            key="Filter"
            header="Filter"
          >
            {Array.isArray(panels) && panels.includes('Filter') &&
            <FieldArray
              name={'connectedData.filter'}
              component={FiltersFieldsContainer}
              {...this.props}
            />
            }
          </Panel>

          <Panel
            key="stateColors"
            header="State colors"
          >
            {Array.isArray(panels) && panels.includes('stateColors') && <EntryPointStateColors

              onSubmit={this.handleSubmit}
            />}
          </Panel>
        </Collapse></ErrorBoundary>
    );
  }
}
