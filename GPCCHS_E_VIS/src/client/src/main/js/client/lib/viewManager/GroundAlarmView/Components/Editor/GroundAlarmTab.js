/* eslint-disable no-unused-vars,react/no-unused-prop-types */ // @todo remove
import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import _get from 'lodash/get';
import _getOr from 'lodash/fp/getOr';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableViewColumns from 'viewManager/commonEditor/TableViewColumns';
import WithForm from 'viewManager/common/Hoc/WithForm';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { TableConfigurationColumnType } from '../../../common/Components/types';

export default class GroundAlarmTab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from GroundAlarmTabContainer mapStateToProps
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      tables: PropTypes.shape({
        main: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    // from GroundAlarmTabContainer mapDispatchToProps
    updateTableCols: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
  };
  state = {
    isTitleOpen: false,
    GroundAlarmTableViewColumnsForm: WithForm(TableViewColumns),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        GroundAlarmTableViewColumnsForm: WithForm(TableViewColumns),
      });
    }
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  handleSubmit = (values) => {
    const { updateTableCols, viewId, configuration } = this.props;
    const cols = _get(configuration, ['tables', 'main', 'cols']); // default initial value from config
    updateTableCols(viewId, 'main', _getOr(cols, 'cols', values)); // update cols value in config
  };

  render() {
    const { panels, viewId, configuration } = this.props;
    const { GroundAlarmTableViewColumnsForm } = this.state;
    const cols = _get(configuration, ['tables', 'main', 'cols']); // default initial value from config
    const initialValues = { cols };

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
            header="Columns"
            key="columns"
          >
            {panels.columns && <GroundAlarmTableViewColumnsForm
              initialValues={initialValues}
              viewId={viewId}
              onSubmit={this.handleSubmit}
              onOrderChange={this.handleSubmit}
              form={`ground-alarm-tab-form-${viewId}`}
            />}
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
