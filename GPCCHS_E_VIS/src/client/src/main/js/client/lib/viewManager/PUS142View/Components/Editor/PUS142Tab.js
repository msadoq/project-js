import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';

export default class PUS142Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUS142TabContainer mapDispatchToProps
    updateViewPanels: PropTypes.func.isRequired,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  render() {
    const { panels, viewId } = this.props;

    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Parameters"
            key="parameters"
          >
            {panels.parameters && <ViewParamsContainer viewId={viewId} />}
          </Panel>
          <Panel
            header="Functional Monitoring Columns"
            key="pus142-functional-monitoring-panel"
          >
            {
              panels['pus142-functional-monitoring-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'functionalMonitoring'}
              />
            }
          </Panel>
          <Panel
            header="Parameter Monitorings Columns"
            key="pus142-parameter-monitorings-panel"
          >
            {
              panels['pus142-parameter-monitorings-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'parameterMonitorings'}
              />
            }
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
