// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import EditTimeline from './EditTimeline';

export default class EditTimelineWrapper extends PureComponent {
  static propTypes = {
    updateMasterId: PropTypes.func.isRequired,
    updateOffset: PropTypes.func.isRequired,
    updateId: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timelineUuid: PropTypes.string.isRequired,
    timebar: PropTypes.shape().isRequired,
    timeline: PropTypes.shape().isRequired,
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

  willEditTimeline = (values) => {
    const {
      updateOffset,
      updateId,
      updateColor,
      timebarUuid,
      updateMasterId,
      timebar,
      timelines,
      updateSessionName,
      closeModal,
    } = this.props;

    const timeline = timelines.find(x => x.uuid === values.uuid);
    const offset = parseInt(values.offset, 10);

    if (timeline.id !== values.id) {
      updateId(values.uuid, values.id);
    }
    if (timeline.color !== values.color) {
      updateColor(values.uuid, values.color);
    }
    // if (timeline.sessionId !== parseInt(values.sessionId, 10)) {
    if (timeline.sessionName !== values.sessionName) {
      updateSessionName(values.uuid, values.sessionName);
    }

    if (values.master && timebar.masterId !== values.id) {
      updateMasterId(timebarUuid, values.id);
      timelines.forEach((t) => {
        if (t.uuid === values.uuid) {
          return;
        }
        updateOffset(t.uuid, t.offset - offset);
      });
      updateOffset(values.uuid, 0);
    } else if (timeline.offset !== offset) {
      if ((timebar.masterId === values.id) || (values.master && timebar.masterId !== values.id)) {
        timelines.forEach((t) => {
          if (t.uuid === values.uuid) {
            return;
          }
          updateOffset(t.uuid, t.offset - offset);
        });
        updateOffset(values.uuid, 0);
      } else {
        updateOffset(values.uuid, offset);
      }
    }
    closeModal();
  }

  render() {
    const {
      timelines,
      sessions,
      timebarUuid,
      timelineUuid,
      timeline,
      timebar,
    } = this.props;

    return (
      <EditTimeline
        form={`timebar-${timebarUuid}-editTrack`}
        onSubmit={this.willEditTimeline}
        sessions={sessions}
        timelines={timelines}
        masterId={timebar.masterId}
        id={timeline.id}
        uuid={timelineUuid}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
        initialValues={{
          master: timebar.masterId === timeline.id,
          id: timeline.id,
          color: timeline.color,
          kind: timeline.kind,
          sessionName: timeline.sessionName,
          uuid: timelineUuid,
          offset: timeline.offset,
        }}
      />
    );
  }
}
