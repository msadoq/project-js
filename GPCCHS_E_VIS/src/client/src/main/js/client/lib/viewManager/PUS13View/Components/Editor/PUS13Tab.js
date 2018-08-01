import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';

export default class PUS13Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUS13TabContainer mapDispatchToProps
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
            header="parameterMonitoringDefinitions Columns"
            key="pus13-parameter-monitoring-definitions-panel"
          >
            {
              panels['pus13-parameter-monitoring-definitions-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'parameterMonitoringDefinitions'}
              />
            }
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
