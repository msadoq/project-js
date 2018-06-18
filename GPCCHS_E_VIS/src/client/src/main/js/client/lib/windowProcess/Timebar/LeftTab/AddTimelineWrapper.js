// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not
//  displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : Lint errors fixes and useless props removed in
//  LeftTab / AddTimelineWrapper.
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { schemeCategory20b } from 'd3-scale';
import { sessionsType, timelinesType } from 'viewManager/common/Components/types';
import AddTimeline from './AddTimeline';

const { func, string } = PropTypes;

export default class AddTimelineWrapper extends PureComponent {
  static propTypes = {
    closeModal: func.isRequired,
    createNewTimeline: func.isRequired,
    updateMasterId: func.isRequired,
    updateOffset: func.isRequired,
    timebarUuid: string.isRequired,
    timelines: timelinesType.isRequired,
    sessions: sessionsType.isRequired,
  };

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
  };

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
