import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import _get from 'lodash/get';
import _getOr from 'lodash/fp/getOr';

import TableViewColumns from 'viewManager/commonEditor/TableViewColumns';
import WithForm from 'viewManager/common/Hoc/WithForm';


export default class HistoryTab extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
    tables: PropTypes.shape().isRequired,
    updateTableCols: PropTypes.func.isRequired,
  };

  state = {
    isTitleOpen: false,
    HistoryTableViewColumnsForm: WithForm(TableViewColumns),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        HistoryViewColumnsForm: WithForm(TableViewColumns),
      });
    }
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  handleSubmit = (values) => {
    const { updateTableCols, viewId, tables } = this.props;
    const cols = _get(tables, ['history', 'cols']);
    updateTableCols(viewId, 'history', _getOr(cols, 'cols', values));
  };

  render() {
    const { viewId, panels, tables } = this.props;
    const { HistoryTableViewColumnsForm } = this.state;

    const cols = _get(tables, ['history', 'cols']);

    const colsWithValueKey = cols.reduce((acc, cur) => (
      [
        ...acc,
        {
          ...cur,
          value: cur.title,
        },
      ]
    ), []);

    const initialValues = { cols: colsWithValueKey };

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
            {panels.columns && <HistoryTableViewColumnsForm
              initialValues={initialValues}
              viewId={viewId}
              onSubmit={this.handleSubmit}
              onOrderChange={this.handleSubmit}
              form={`history-tab-form-${viewId}`}
            />}
          </Panel>
        </Collapse>
      </div>
    );
  }
}
