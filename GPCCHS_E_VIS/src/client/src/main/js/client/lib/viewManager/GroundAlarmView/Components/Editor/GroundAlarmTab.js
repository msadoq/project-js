/* eslint-disable no-unused-vars,react/no-unused-prop-types */ // @todo remove
import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableViewColumns from 'viewManager/commonEditor/TableViewColumns';
import _getOr from 'lodash/fp/getOr';
import WithForm from 'viewManager/common/Hoc/WithForm';
import { TableConfigurationColumnType } from '../../../common/Components/types';

const TableViewColumnsForm = WithForm(TableViewColumns);
const { string, shape, func, arrayOf } = PropTypes;

export default class GroundAlarmTab extends React.Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    panels: shape({}).isRequired,
    updateViewPanels: func.isRequired,
    // from GroundAlarmTabContainer mapStateToProps
    cols: arrayOf(TableConfigurationColumnType).isRequired,
    // from GroundAlarmTabContainer mapDispatchToProps
    updateTableCols: func.isRequired,
  };
  state = {
    isTitleOpen: false,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  handleSubmit = (values) => {
    const { updateTableCols, viewId, cols } = this.props;
    updateTableCols(viewId, _getOr(cols, 'cols', values));
  };

  render() {
    const { panels, viewId, cols } = this.props;
    const initialValues = { cols };

    return (
      <div>
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
            header="Columns"
            key="columns"
          >
            {panels.columns && <TableViewColumnsForm
              cols={cols}
              initialValues={initialValues}
              viewId={viewId}
              onSubmit={this.handleSubmit}
              onOrderChange={this.handleSubmit}
              form={`ground-alarm-tab-form-${viewId}`}
            />}
          </Panel>
        </Collapse>
      </div>
    );
  }
}
