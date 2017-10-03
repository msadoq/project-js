import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmView from './GroundAlarmView';
import { getAlarmDomain, getAlarmTimeline } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';

import withStub from '../../../../windowProcess/common/hoc/withStub';

const append = _.curry((val, t) => _.concat(t, val));

const connectStub = withStub({
  frequency: 1000,
  updater: _.pipe(
    _.update('data.tick', _.add(1)),
    state => _.update('data.lines', append(`ep1 ${state.data.tick}`), state),
    state => _.set(['data', 'data', 'ep1', state.data.tick], {
      name: state.data.tick,
      timestamp: state.data.tick,
      epName: state.data.tick,
      masterTime: state.data.tick,
    }, state)
  ),
  initialState: {
    data: {
      cols: ['name', 'timestamp', 'epName', 'masterTime'],
      lines: [],
      data: { ep1: {} },
    },
  },
});

const GroundAlarmViewStubbed = connectStub(GroundAlarmView);

const mapStateToProps = createStructuredSelector({
  data: getData,
  alarmDomain: getAlarmDomain,
  alarmTimeline: getAlarmTimeline,
});

const GroundAlarmViewContainer = connect(mapStateToProps)(GroundAlarmViewStubbed);

GroundAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmViewContainer;
