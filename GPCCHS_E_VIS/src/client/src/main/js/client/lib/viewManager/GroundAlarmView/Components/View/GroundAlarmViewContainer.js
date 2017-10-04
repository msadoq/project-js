import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmView from './GroundAlarmView';
import { getAlarmDomain, getAlarmTimeline } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';

import withStub from '../../../../windowProcess/common/hoc/withStub';

const append = _.curry((val, t) => _.concat(t, val));

const stub = withStub({
  frequency: 1000,
  updater: _.pipe(
    _.update('tick', _.add(1)),
    state => _.set(['data', 'data', state.tick], {
      name: state.tick,
      timestamp: state.tick,
      epName: state.tick,
      masterTime: state.tick,
      transitions: [
        { a: 'aaa', b: 'bbb', groundDate: state.tick },
        { b: 'bbb', c: 'ccc', groundDate: state.tick + 1 },
        { c: 'ccc', d: 'ddd', groundDate: state.tick + 2 },
      ],
    }, state),
    state => _.update('data.lines', append([
      { type: 'alarm', data: state.data.data[state.tick] },
      { type: 'transition_header' },
      { type: 'transition', data: state.data.data[state.tick].transitions[0] },
      { type: 'transition', data: state.data.data[state.tick].transitions[1] },
      { type: 'transition', data: state.data.data[state.tick].transitions[1] },
    ]), state)
  ),
  initialState: {
    tick: 0,
    data: {
      cols: ['name', 'timestamp', 'epName', 'masterTime'],
      transitionsCols: ['a', 'b', 'c', 'd', 'groundDate'],
      lines: [],
      data: {},
    },
  },
});

const GroundAlarmViewStubbed = stub(GroundAlarmView);

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
