import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';

export default class PUSMMETab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUSMMETabContainer mapDispatchToProps
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
            header="Sub-Schedule Columns"
            key="pusmme-sub-schedules-panel"
          >
            {
              panels['pusmme-sub-schedules-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'subSchedules'}
              />
            }
          </Panel>
          <Panel
            header="Commands Columns"
            key="pusmme-commands-panel"
          >
            {
              panels['pusmme-commands-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'commands'}
              />
            }
          </Panel>
          <Panel
            header="Enabled Apids Columns"
            key="pusmme-enabled-apids-panel"
          >
            {
              panels['pusmme-enabled-apids-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'enabledApids'}
              />
            }
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
