// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';

import EntryPointStateColors from 'viewManager/commonEditor/EntryPoint/EntryPointStateColors';
import EntryPointConnectedData from './EntryPointConnectedData';
import AddEntryPoint from './AddEntryPoint';

const { Panel } = Collapse;
const { string, arrayOf, oneOfType, shape, func, bool, number } = PropTypes;
const emptyArray = [];

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    entryPoint: shape({
      id: string,
      name: string,
      connectedData: shape({
        digits: number,
        domain: string,
        filter: arrayOf(shape({
          field: string,
          operand: string,
          operator: string,
        })),
      }),
    }).isRequired,
    updateEntryPoint: func.isRequired,
    panels: oneOfType([
      arrayOf(string),
      bool,
    ]).isRequired,
    updateViewSubPanels: func.isRequired,
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

  render() {
    const {
      entryPoint,
      viewId,
      panels,
    } = this.props;

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={panels === true ? emptyArray : panels}
      >
        <Panel
          key="name"
          header="Name"
        >
          {Array.isArray(panels) && panels.includes('name') && <AddEntryPoint
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${entryPoint.id}-${viewId}`}
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
            form={`entrypoint-connectedData-form-${entryPoint.id}-${viewId}`}
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
            form={`entrypoint-stateColors-form-${entryPoint.id}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
