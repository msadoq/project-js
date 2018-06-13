import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';

import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';


export default class HistoryTab extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
  };

  state = {
    isTitleOpen: false,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  render() {
    const { viewId, panels } = this.props;

    return (
      <div>
        <Collapse
          accordion={false}
          onChange={this.onChange}
        >
          <Panel
            header="Parameters"
            key="parameters"
          >
            {panels.parameters && <ViewParamsContainer viewId={viewId} />}
          </Panel>
          <Panel
            header="Columns"
            key="columns"
          >
            {
              panels.columns &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'history'}
              />
            }
          </Panel>
        </Collapse>
      </div>
    );
  }
}
