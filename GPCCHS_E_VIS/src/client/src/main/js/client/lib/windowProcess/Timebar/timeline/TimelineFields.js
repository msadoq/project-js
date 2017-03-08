import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import { schemeCategory20b } from 'd3-scale';
import {
  InputField,
  ColorPickerField,
  ButtonToggleField,
} from '../../Editor/Components/Fields/';
import OffsetFields from './OffsetFields';
import {
  HorizontalFormGroup,
} from '../../Editor/Components/Forms/';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class TimelineFields extends PureComponent {
  static propTypes = {
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineUuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
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
    id: PropTypes.string,
    masterId: PropTypes.string,
    timelineUuid: PropTypes.string,
  }

  static defaultProps = {
    masterId: null,
    id: null,
    timelineUuid: null,
  }

  render() {
    const {
      timelines,
      sessions,
      id,
      masterId,
      timelineUuid,
    } = this.props;

    return (
      <div>
        {(!id || !masterId || (masterId !== id)) && <HorizontalFormGroup label="Master timeline">
          <Field
            name="master"
            component={ButtonToggleField}
            textOn="YES"
            textOff="NO"
          />
        </HorizontalFormGroup>}

        <HorizontalFormGroup label="Type">
          <Field
            name="kind"
            component="select"
            type="text"
            className="form-control input-sm"
          >
            <option value="session">session</option>
            <option disabled value="dataSet">dataSet</option>
            <option disabled value="recordSet">recordSet</option>
          </Field>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Name">
          <Field
            name="id"
            component={InputField}
            type="text"
            className="form-control input-sm"
            validate={(val) => {
              if (timelines.find(t => t.id === val && t.timelineUuid !== timelineUuid)) {
                return 'This id is already taken';
              }
              return undefined;
            }}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Session">
          <Field
            name="sessionId"
            component="select"
            type="text"
            className="form-control input-sm"
          >
            {sessions.map(session =>
              <option key={session.id} value={session.id}>{session.name}</option>
            )}
          </Field>
        </HorizontalFormGroup>

        <hr />

        <HorizontalFormGroup label="Offset (h-m-s-ms)">
          <Field
            name="offset"
            component={OffsetFields}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="color"
            component={ColorPickerField}
            colors={schemeCategory20b}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
