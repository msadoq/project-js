import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTimebar } from '../../store/selectors/timebars';
import { makeEntryPointsMap } from '../../mainProcess/data/dataMap';

const selector = makeEntryPointsMap();

const Data = props => {
  const ViewType = props.component;
  return <ViewType {...props} />;
};

Data.propTypes = {
  viewId: PropTypes.string.isRequired,
  timebarId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // current visualisation window
  const timebar = getTimebar(state, ownProps.timebarId);

  // data
  const cds = selector(state, ownProps);
  const data = _.reduce(cds, (list, { localIds }, remoteId) => {
    return _.reduce(localIds, (l, localIdData, localId) => {
      return _.set(
        list,
        [remoteId, localId, 'data'],
        _.get(state, ['dataCache', remoteId, localId, 'data'], [])
      );
    }, list)
  }, {});

  return {
    ...ownProps,
    interval: timebar.visuWindow,
    data,
  };
};

export default connect(mapStateToProps)(Data);
