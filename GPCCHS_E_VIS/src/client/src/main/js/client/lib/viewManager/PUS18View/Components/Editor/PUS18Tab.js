import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';

export default class PUS18Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUS18TabContainer mapDispatchToProps
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
            header="onBoardStorages Columns"
            key="pus18-onboard-storages-panel"
          >
            {
              panels['pus18-onboard-storages-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'onBoardStorages'}
              />
            }
          </Panel>
          <Panel
            header="Storage Definitions Columns"
            key="pus18-storage-def-panel"
          >
            {
              panels['pus18-storage-def-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'storageDef'}
              />
            }
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
