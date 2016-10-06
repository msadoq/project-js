import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import debug from '../../utils/windowDebug';
import { getWebsocket } from '../../websocket/windowWebsocket';

import forPage from '../../connectedData/forPage';
import missingIntervals from '../../connectedData/missingIntervals';
import { mergeIntervals } from '../../connectedData/intervals';
import { getTimebar } from '../../store/mutations/timebarReducer';

const logger = debug('DataConsumerContainer');

class DataConsumerContainer extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    interval: PropTypes.object.isRequired,
    remoteIds: PropTypes.object,
  };
  componentWillReceiveProps(nextProps) {
    this.missingData(this.props.remoteIds, this.props.interval, nextProps.interval);
  }
  componentDidMount() {
    // TODO : BIG BUG, componentDidMount isn't fired again on other page
    this.missingData(this.props.remoteIds, null, this.props.interval);
  }

  // TODO FACTORIZE ELSEWHERE
  missingData(remoteIds, prevInterval, nextInterval) {
    const queries = {};
    _.each(remoteIds, ({ localIds, dataId, filter }, remoteId) => {
      _.each(localIds, ({ offset }) => {
        const missing = missingIntervals(
          prevInterval ? [prevInterval.lower + offset, prevInterval.upper + offset] : [],
          [nextInterval.lower + offset, nextInterval.upper + offset]
        );

        if (!missing.length) {
          return [];
        }

        if (!queries[remoteId]) {
          queries[remoteId] = {
            dataId,
            filter,
            intervals: [],
          };
        }

        _.each(missing, (m) => {
          queries[remoteId].intervals = mergeIntervals(queries[remoteId].intervals, m);
        });
      });
    });

    logger.debug('dataQuery', queries);
    getWebsocket().write({ event: 'dataQuery', payload: queries });
  }
  // TODO FACTORIZE ELSEWHERE
  render() {
    return (
      <div>
        <ul>
          {_.map(this.props.remoteIds, (l, remoteId) =>
            <li key={`${remoteId}`}>
              <h3>{remoteId}</h3>
              <ul>
                {_.map(l, (d, localId) =>
                <li key={`${localId}`}>{localId}</li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, { pageId, timebarId }) {
  const timebar = getTimebar(state, timebarId);
  const { lower, current, upper } = timebar.visuWindow;

  return {
    pageId,
    interval: { lower, current, upper },
    remoteIds: forPage(state, pageId),
  };
}

export default connect(mapStateToProps)(DataConsumerContainer);
