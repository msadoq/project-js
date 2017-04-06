import React, { PropTypes, PureComponent } from 'react';

import {
  Accordion,
  Panel,
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';

import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedData from './EntryPointConnectedData';
import EntryPointStateColors from '../../../commonEditor/EntryPoint/EntryPointStateColors';

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
    isPanelCoordinatesOpen: false,
    isPanelStateColorsOpen: false,
    isPanelParametersOpen: false,
  };

  openPanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: false }));

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
      isPanelCoordinatesOpen,
      isPanelStateColorsOpen,
      isPanelParametersOpen,
    } = this.state;
    // TODO Rerender (new ref)
    const initialValuesParameters = { ...entryPoint.objectStyle, name: entryPoint.name };

    // TODO Rerender (new ref)
    const initialValuesStateColors = { stateColors: entryPoint.stateColors || [] };
    return (
      <Accordion>
        <Panel
          key={'Parameters'}
          header="Parameters"
          eventKey={'Parameters'}
          expanded={isPanelParametersOpen}
          onSelect={this.openPanel('Parameters')}
          onExited={this.closePanel('Parameters')}
        >
          {isPanelParametersOpen && <EntryPointParameters
            onSubmit={this.handleObjectParametersSubmit}
            form={`entrypoint-parameters-form-${idPoint}-${viewId}`}
            initialValues={initialValuesParameters}
          />}
        </Panel>

        <Panel
          key={'Coordinates'}
          header="Coordinates"
          eventKey={'Coordinates'}
          expanded={isPanelCoordinatesOpen}
          onSelect={this.openPanel('Coordinates')}
          onExited={this.closePanel('Coordinates')}
        >
          {isPanelCoordinatesOpen && <EntryPointConnectedData
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
          key={'StateColors'}
          header="State colors"
          eventKey={'StateColors'}
          expanded={isPanelStateColorsOpen}
          onSelect={this.openPanel('StateColors')}
          onExited={this.closePanel('StateColors')}
        >
          {isPanelStateColorsOpen && <EntryPointStateColors
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initialValues={initialValuesStateColors}
            form={`entrypoint-stateColors-form-${idPoint}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Accordion>
    );
  }
}
