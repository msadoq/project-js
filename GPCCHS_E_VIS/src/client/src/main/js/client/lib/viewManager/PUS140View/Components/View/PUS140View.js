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
    domain: PropTypes.string,
    timeline: PropTypes.string,
  };

  static defaultProps = {
    serviceApid: null,
    domain: null,
    timeline: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      domain,
      timeline,
      viewId,
    } = this.props;

    if (!isValid(timeline, domain, serviceApid)) {
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

export const isValid = (domain, timeline, applicationProcessId) =>
  domain &&
  domain.length > 0 &&
  timeline && timeline.length > 0 &&
  typeof applicationProcessId === 'number'
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
