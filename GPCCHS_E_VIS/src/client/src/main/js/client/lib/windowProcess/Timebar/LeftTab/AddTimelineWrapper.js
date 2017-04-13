import React, { PureComponent, PropTypes } from 'react';
import { schemeCategory20b } from 'd3-scale';
import AddTimeline from './AddTimeline';

export default class AddTimelineWrapper extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    createNewTimeline: PropTypes.func.isRequired,
    updateMasterId: PropTypes.func.isRequired,
    updateOffset: PropTypes.func.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
      })
    ).isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        delta: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        missionEpoch: PropTypes.number.isRequired,
        timestamp: PropTypes.shape({
          ms: PropTypes.number,
          ps: PropTypes.number,
        }),
      })
    ).isRequired,
  }

  willAddTimeline = (values) => {
    const {
      timebarUuid,
      timelines,
      updateMasterId,
      createNewTimeline,
      updateOffset,
      closeModal,
    } = this.props;

    const timelinesBeforeAdd = [].concat(timelines);

    createNewTimeline(
      timebarUuid,
      {
        kind: values.kind,
        id: values.id,
        sessionName: values.sessionName,
        color: values.color,
        offset: values.master ? 0 : parseInt(values.offset, 10),
      }
    );
    closeModal();
    if (values.master) {
      timelinesBeforeAdd.forEach(t =>
        updateOffset(t.uuid, t.offset - values.offset)
      );
      updateMasterId(timebarUuid, values.id);
    }
  }

  render() {
    const {
      timelines,
      sessions,
      timebarUuid,
    } = this.props;

    return (
      <AddTimeline
        form={`timebar-${timebarUuid}-addTrack`}
        sessions={sessions}
        timelines={timelines}
        onSubmit={this.willAddTimeline}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
        initialValues={{
          id: '',
          color: schemeCategory20b[timelines.length % 20],
          kind: 'session',
          sessionName: sessions[0] ? sessions[0].name : '',
          offset: 0,
          master: false,
        }}
      />
    );
  }
}
