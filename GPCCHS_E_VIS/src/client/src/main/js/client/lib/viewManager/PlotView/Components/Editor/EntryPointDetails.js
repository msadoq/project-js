// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : PlotView editor: Time based data : unit x: 's', axisId: 'time', auto values. Display non-editable values.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : PlotView EntryPoint refacto: connectedData instead of connectedDataX and connectedDataY.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Added "connectedDataParametric" key to EntryPoints in PlotViews JSON files, EntryPoints can be parametric or not. Updated PlotView's editor accordingly.
// VERSION : 1.1.2 : DM : #6835 : 12/09/2017 : Fixed two lint errors in PlotView Editor and View.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import Collapse from 'rc-collapse';
import _get from 'lodash/get';
import EntryPointStateColors from 'viewManager/commonEditor/EntryPoint/EntryPointStateColors';
import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';

import { entryPointType } from '../../../common/Components/types';
import FiltersFieldsContainer from '../../../commonEditor/Fields/FiltersFieldsContainer';

const { Panel } = Collapse;
const emptyArray = [];

const { string, shape, arrayOf, bool, func, oneOfType } = PropTypes;

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    timelines: arrayOf(shape({})).isRequired,
    axes: shape({}).isRequired,
    entryPoint: entryPointType.isRequired,
    updateEntryPoint: func.isRequired,
    panels: oneOfType([
      arrayOf(string),
      bool,
    ]).isRequired,
    updateViewSubPanels: func.isRequired,
    domains: arrayOf(shape({})).isRequired,
    form: string.isRequired,
    selectedDomainName: string,
    selectedTimelineId: string,
    selectedCatalogName: string,
    selectedItemName: string,
    selectedComObjectName: string,

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
        connectedData: {
          ...values.connectedData,
          provider: values.provider,
        },
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
    const initialValuesParameters = {
      ...entryPoint.objectStyle,
      name: entryPoint.name,
      displayLine: _get(
        entryPoint, 'displayLine', _get(
          entryPoint, ['objectStyle', 'line', 'size'], 0) > 0),
      displayPoints: _get(
        entryPoint, 'displayPoints', _get(
          entryPoint, ['objectStyle', 'points', 'size'], 0) > 0),
    };
    // TODO Rerender (new ref)
    const initialValuesConnectedData = {
      connectedData: entryPoint.connectedData,
      connectedDataParametric: entryPoint.connectedDataParametric,
      parametric: entryPoint.parametric,
      provider: entryPoint.connectedData.provider,
    };
    // TODO Rerender (new ref)
    const initialValuesStateColors = { stateColors: entryPoint.stateColors || [] };

    return (
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
            initialValues={initialValuesParameters}
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
            initialValues={initialValuesConnectedData}
            form={this.props.form}
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
            initialValues={initialValuesStateColors}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
