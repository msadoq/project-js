/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import _get from 'lodash/get';
import _getOr from 'lodash/fp/getOr';
import TableViewColumns from 'viewManager/commonEditor/TableViewColumns';
import WithForm from 'viewManager/common/Hoc/WithForm';
import { TableConfigurationColumnType } from '../../../common/Components/types';

const { string, shape, func, arrayOf } = PropTypes;

export default class PUS11Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    panels: shape({}).isRequired,
    // from PUS11TabContainer mapStateToProps
    configuration: shape({
      tables: shape({
        subSchedules: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        enabledApids: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        commands: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    // from PUS11TabContainer mapDispatchToProps
    updateTableCols: func.isRequired,
    updateViewPanels: func.isRequired,
  };
  state = {
    isTitleOpen: false,
    PUS11SubScheduleTableViewColumnsForm: WithForm(TableViewColumns),
    PUS11EnabledApidsTableViewColumnsForm: WithForm(TableViewColumns),
    PUS11CommandsTableViewColumnsForm: WithForm(TableViewColumns),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        PUS11SubScheduleTableViewColumnsForm: WithForm(TableViewColumns),
        PUS11EnabledApidsTableViewColumnsForm: WithForm(TableViewColumns),
        PUS11CommandsTableViewColumnsForm: WithForm(TableViewColumns),
      });
    }
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  handleSubmit = (values, tableId) => {
    const { updateTableCols, viewId, configuration } = this.props;
    const cols = _get(configuration, ['tables', tableId, 'cols']);
    updateTableCols(viewId, tableId, _getOr(cols, 'cols', values)); // update cols value in config
  };

  render() {
    const { panels, viewId, configuration } = this.props;
    const { PUS11SubScheduleTableViewColumnsForm,
      PUS11EnabledApidsTableViewColumnsForm,
      PUS11CommandsTableViewColumnsForm } = this.state;
    const subSchedulesCols = { cols: _get(configuration, ['tables', 'subSchedules', 'cols']) };
    const enabledApidsCols = { cols: _get(configuration, ['tables', 'enabledApids', 'cols']) };
    const commandsCols = { cols: _get(configuration, ['tables', 'commands', 'cols']) };

    return (
      <div>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Sub-Schedule Columns"
            key="pus11-sub-schedules-panel"
          >
            {panels['pus11-sub-schedules-panel'] && <PUS11SubScheduleTableViewColumnsForm
              initialValues={subSchedulesCols}
              viewId={viewId}
              onSubmit={values => this.handleSubmit(values, 'subSchedules')}
              onOrderChange={values => this.handleSubmit(values, 'subSchedules')}
              form={`pus11-sub-schedules-tab-form-${viewId}`}
            />}
          </Panel>
          <Panel
            header="Commands Columns"
            key="pus11-commands-panel"
          >
            {panels['pus11-commands-panel'] && <PUS11EnabledApidsTableViewColumnsForm
              initialValues={commandsCols}
              viewId={viewId}
              onSubmit={values => this.handleSubmit(values, 'commands')}
              onOrderChange={values => this.handleSubmit(values, 'commands')}
              form={`pus11-commands-tab-form-${viewId}`}
            />}
          </Panel>
          <Panel
            header="Enabled Apids Columns"
            key="pus11-enabled-apids-panel"
          >
            {panels['pus11-enabled-apids-panel'] && <PUS11CommandsTableViewColumnsForm
              initialValues={enabledApidsCols}
              viewId={viewId}
              onSubmit={values => this.handleSubmit(values, 'enabledApids')}
              onOrderChange={values => this.handleSubmit(values, 'enabledApids')}
              form={`pus11-enabled-apids-tab-form-${viewId}`}
            />}
          </Panel>
        </Collapse>
      </div>
    );
  }
}
