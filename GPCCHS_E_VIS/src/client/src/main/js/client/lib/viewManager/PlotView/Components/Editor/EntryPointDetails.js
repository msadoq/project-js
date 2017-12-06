import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';
import EntryPointStateColors from 'viewManager/commonEditor/EntryPoint/EntryPointStateColors';
import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';

const { Panel } = Collapse;
const emptyArray = [];

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    axes: PropTypes.shape({}).isRequired,
    entryPoint: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      parametric: PropTypes.bool.isRequired,
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
    }).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  }

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
    });
  }

  handleObjectParametersSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      objectStyle: values,
      name: values.name,
    });
  }

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
  }

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
    const initialValuesParameters = { ...entryPoint.objectStyle, name: entryPoint.name };
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
