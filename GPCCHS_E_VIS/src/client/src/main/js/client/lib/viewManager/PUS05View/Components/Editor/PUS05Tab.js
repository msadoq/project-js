/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import _get from 'lodash/get';
import _getOr from 'lodash/fp/getOr';
import TableViewColumns from 'viewManager/commonEditor/TableViewColumns';
import WithForm from 'viewManager/common/Hoc/WithForm';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { entryPointType, TableConfigurationColumnType } from '../../../common/Components/types';

export default class PUS05Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUS05TabContainer mapStateToProps
    configuration: PropTypes.shape({
      entryPoints: PropTypes.arrayOf(entryPointType),
      tables: PropTypes.shape({
        onBoardEvents: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        receivedOnBoardEvents: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    // from PUS05TabContainer mapDispatchToProps
    updateTableCols: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
  };
  state = {
    isTitleOpen: false,
    PUS05OnBoardEventsTableViewColumnsForm: WithForm(TableViewColumns),
    PUS05ReceivedOnBoardEventsTableViewColumnsForm: WithForm(TableViewColumns),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        PUS05OnBoardEventsTableViewColumnsForm: WithForm(TableViewColumns),
        PUS05ReceivedOnBoardEventsTableViewColumnsForm: WithForm(TableViewColumns),
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
    const { PUS05OnBoardEventsTableViewColumnsForm,
      PUS05ReceivedOnBoardEventsTableViewColumnsForm } = this.state;
    const onBoardEventsCols = { cols: _get(configuration, ['tables', 'onBoardEvents', 'cols']) };
    const receivedOnBoardEventsCols = { cols: _get(configuration, ['tables', 'receivedOnBoardEvents', 'cols']) };

    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Onboard events Columns"
            key="pus05-onboard-events-panel"
          >
            {panels['pus05-onboard-events-panel'] && <PUS05OnBoardEventsTableViewColumnsForm
              initialValues={onBoardEventsCols}
              viewId={viewId}
              onSubmit={values => this.handleSubmit(values, 'onBoardEvents')}
              onOrderChange={values => this.handleSubmit(values, 'onBoardEvents')}
              form={`pus05-sub-schedules-tab-form-${viewId}`}
            />}
          </Panel>
          <Panel
            header="Received onboard events Columns"
            key="pus05-received-onboard-events-panel"
          >
            {panels['pus05-received-onboard-events-panel'] && <PUS05ReceivedOnBoardEventsTableViewColumnsForm
              initialValues={receivedOnBoardEventsCols}
              viewId={viewId}
              onSubmit={values => this.handleSubmit(values, 'receivedOnBoardEvents')}
              onOrderChange={values => this.handleSubmit(values, 'receivedOnBoardEvents')}
              form={`pus05-receivedOnBoardEvents-tab-form-${viewId}`}
            />}
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
