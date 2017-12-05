import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';
import _get from 'lodash/get';
import EntryPointStateColors from 'viewManager/commonEditor/EntryPoint/EntryPointStateColors';
import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';

import { entryPointType } from '../../../common/Components/types';

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
  };

  static defaultProps = {
    panels: [],
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
        connectedData: values.connectedData,
        connectedDataParametric: values.connectedDataParametric,
      }
    );
  };

  render() {
    const {
      entryPoint,
      viewId,
      axes,
      timelines,
      panels,
      domains,
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
            form={`entrypoint-parameters-form-${entryPoint.id}-${viewId}`}
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
            form={`entrypoint-connectedData-form-${entryPoint.id}-${viewId}`}
            onSubmit={this.handleConnectedDataSubmit}
            initialValues={initialValuesConnectedData}
          />}
        </Panel>
        <Panel
          key="stateColors"
          header="State colors"
        >
          {Array.isArray(panels) && panels.includes('stateColors') && <EntryPointStateColors
            initialValues={initialValuesStateColors}
            form={`entrypoint-stateColors-form-${entryPoint.id}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
