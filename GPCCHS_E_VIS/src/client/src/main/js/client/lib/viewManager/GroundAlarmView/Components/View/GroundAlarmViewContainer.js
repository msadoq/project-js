import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmView from './GroundAlarmView';
import { getAlarmTimeline } from '../../store/configurationReducer';
import { getData } from '../../store/dataReducer';

import * as actions from '../../store/actions';

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
        { a: '111', b: '222', groundDate: state.tick },
        { a: '333', b: '444', groundDate: state.tick + 1 },
        { a: '555', b: '666', groundDate: state.tick + 2 },
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
      transitionsCols: ['a', 'b', 'groundDate'],
      lines: [],
      data: {},
    },
  },
});

const GroundAlarmViewStubbed = stub(GroundAlarmView);

const mapStateToProps = createStructuredSelector({
  data: getData,
  timeline: getAlarmTimeline,
  // availableTimelines: getTimelines,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  updateTimeline: timeline => dispatch(actions.updateAlarmTimeline(viewId, timeline)),
});

const GroundAlarmViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroundAlarmViewStubbed);

GroundAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmViewContainer;
