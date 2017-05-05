import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';
import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';
import EntryPointStateColors from '../../../commonEditor/EntryPoint/EntryPointStateColors';

const { Panel } = Collapse;
/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    idPoint: PropTypes.number.isRequired,
    axes: PropTypes.shape({}).isRequired,
    entryPoint: PropTypes.shape({
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
    }).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
  }

  state = {
    openPanels: [],
  };

  onChange = openPanels =>
    this.setState({ openPanels })

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      ...values,
    });
  }

  handleObjectParametersSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
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
      idPoint,
    } = this.props;
    updateEntryPoint(
      viewId,
      idPoint,
      {
        ...entryPoint,
        connectedData: values,
      }
    );
  }

  render() {
    const {
      idPoint,
      entryPoint,
      viewId,
      axes,
      timelines,
    } = this.props;

    const {
      openPanels,
    } = this.state;
    // TODO Rerender (new ref)
    const initialValuesParameters = { ...entryPoint.objectStyle, name: entryPoint.name };

    // TODO Rerender (new ref)
    const initialValuesStateColors = { stateColors: entryPoint.stateColors || [] };
    return (
      <Collapse accordion={false} onChange={this.onChange}>
        <Panel
          key="Parameters"
          header="Parameters"
        >
          {openPanels.includes('Parameters') && <EntryPointParameters
            onSubmit={this.handleObjectParametersSubmit}
            form={`entrypoint-parameters-form-${idPoint}-${viewId}`}
            initialValues={initialValuesParameters}
          />}
        </Panel>

        <Panel
          key="Coordinates"
          header="Coordinates"
        >
          {openPanels.includes('Coordinates') && <EntryPointConnectedData
            axes={axes}
            timelines={timelines}
            idPoint={idPoint}
            viewId={viewId}
            form={`entrypoint-connectedData-form-${idPoint}-${viewId}`}
            onSubmit={this.handleConnectedDataSubmit}
            initialValues={entryPoint.connectedData}
          />}
        </Panel>
        <Panel
          key="State colors"
          header="State colors"
        >
          {openPanels.includes('State colors') && <EntryPointStateColors
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initialValues={initialValuesStateColors}
            form={`entrypoint-stateColors-form-${idPoint}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
