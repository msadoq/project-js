import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';

import EntryPointConnectedData from './EntryPointConnectedData';
import EntryPointName from '../EntryPoint/EntryPointName';
import EntryPointStateColors from '../EntryPoint/EntryPointStateColors';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.array,
    idPoint: PropTypes.number,
    entryPoint: PropTypes.object,
    updateEntryPoint: PropTypes.func.isRequired,
  }

  state = {
    isPanelNameOpen: false,
    isPanelConnDataOpen: false,
    isPanelStateColorsOpen: false,
  };

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      ...values
    });
  }

  openPanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: false }));

  render() {
    const {
      idPoint,
      entryPoint,
      viewId,
      timelines,
    } = this.props;

    const {
      isPanelNameOpen,
      isPanelConnDataOpen,
      isPanelStateColorsOpen,
     } = this.state;

    return (
      <Accordion>
        <Panel
          key={'Name'}
          header="Name"
          eventKey={'Name'}
          expanded={isPanelNameOpen}
          onSelect={this.openPanel('Name')}
          onExited={this.closePanel('Name')}
        >
          {isPanelNameOpen && <EntryPointName
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${idPoint}-${viewId}`}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initialValues={{
              name: entryPoint.name
            }}
          />}
        </Panel>
        <Panel
          key={'ConnData'}
          header="Conn Data"
          eventKey={'ConnData'}
          expanded={isPanelConnDataOpen}
          onSelect={this.openPanel('ConnData')}
          onExited={this.closePanel('ConnData')}
        >
          {isPanelConnDataOpen && <EntryPointConnectedData
            timelines={timelines}
            form={`entrypoint-connectedData-form-${idPoint}-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
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
            initialValues={{
              stateColors: entryPoint.stateColors || []
            }}
            form={`entrypoint-stateColors-form-${idPoint}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Accordion>
    );
  }
}
