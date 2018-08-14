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
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
    } = this.props;

    return (
      <ErrorBoundary>
        <div className="pus140">
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'parameters'}
                contentModifier={_parametersModifier}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
