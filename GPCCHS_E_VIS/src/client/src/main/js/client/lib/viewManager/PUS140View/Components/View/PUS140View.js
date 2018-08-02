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
    // From PUS140ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
  };

  static defaultProps = {
    serviceApid: null,
    apids: [],
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      apids,
      viewId,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

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

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus140 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
