import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS140View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableModifier } from '../../../common/pus/utils';

// PARAMETERS
const parametersTooltips = {
  parameterId: { mode: 'lastUpdateModeParamId', time: 'lastUpdateTimeParamId' },
  parameterName: { mode: 'lastUpdateModeParamId', time: 'lastUpdateTimeParamId' },
  currentValue: { mode: 'lastUpdateModeCurrentValue', time: 'lastUpdateTimeCurrentValue' },
};
const _parametersModifier = tableModifier(parametersTooltips);


export default class PUS140View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS14ViewContainer mapStateToProps
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
    data: {
      headers: [],
      tables: {},
    },
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };


  render() {
    const {
      viewId,
      data,
    } = this.props;

    return (
      <ErrorBoundary>
        <div className="pus140">
          <div className="col-sm-12 h100">
            <VirtualizedTableViewContainer
              viewId={viewId}
              tableId={'parameters'}
              data={data.tables.parameters.data}
              contentModifier={_parametersModifier}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
