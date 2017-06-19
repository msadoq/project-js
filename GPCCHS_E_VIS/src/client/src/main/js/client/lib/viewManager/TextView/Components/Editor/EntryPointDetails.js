import React, { PropTypes } from 'react';
import Collapse, { Panel } from 'rc-collapse';
import EntryPointConnectedData from './EntryPointConnectedData';
import AddEntryPoint from './AddEntryPoint';
import EntryPointStateColors from '../../../commonEditor/EntryPoint/EntryPointStateColors';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      id: PropTypes.string,
      kind: PropTypes.string,
      offset: PropTypes.number,
      sessionId: PropTypes.number,
      timelineUuid: PropTypes.string,
    })).isRequired,
    idPoint: PropTypes.number.isRequired,
    entryPoint: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      connectedData: PropTypes.shape({
        digits: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
      }),
    }).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }
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
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      ...values,
    });
  };

  render() {
    const {
      idPoint,
      entryPoint,
      viewId,
      timelines,
      panels,
      domains,
    } = this.props;

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={panels}
      >
        <Panel
          key="name"
          header="Name"
        >
          {Array.isArray(panels) && panels.includes('name') && <AddEntryPoint
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${idPoint}-${viewId}`}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
            initialValues={{
              name: entryPoint.name,
            }}
          />}
        </Panel>
        <Panel
          key="ConnData"
          header="Connected data"
        >
          {Array.isArray(panels) && panels.includes('ConnData') && <EntryPointConnectedData
            timelines={timelines}
            domains={domains}
            form={`entrypoint-connectedData-form-${idPoint}-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoint.connectedData}
          />}
        </Panel>
        <Panel
          key="stateColors"
          header="State colors"
        >
          {Array.isArray(panels) && panels.includes('stateColors') && <EntryPointStateColors
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
            initialValues={{
              stateColors: entryPoint.stateColors || [],
            }}
            form={`entrypoint-stateColors-form-${idPoint}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
