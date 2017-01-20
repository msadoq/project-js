import React, { PropTypes } from 'react';
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
export default class TimelineFields extends React.Component {
  static propTypes = {
    sessions: PropTypes.array,
    timelines: PropTypes.array,
    id: PropTypes.string,
    masterId: PropTypes.string,
    timelineId: PropTypes.string,
  }

  render() {
    const {
      timelines,
      sessions,
      id,
      masterId,
      timelineId,
    } = this.props;

    return (
      <div>
        <HorizontalFormGroup label="Kind">
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

        {(!masterId || (masterId !== id)) && <HorizontalFormGroup label="Master timeline">
          <Field
            name="master"
            component={ButtonToggleField}
            textOn="YES"
            textOff="NO"
          />
        </HorizontalFormGroup>}

        <HorizontalFormGroup label="Session id">
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

        <HorizontalFormGroup label="Id">
          <Field
            name="id"
            component={InputField}
            type="text"
            className="form-control input-sm"
            validate={(val) => {
              if (timelines.find(t => t.id === val && t.timelineId !== timelineId)) {
                return 'This id is already taken';
              }
            }}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Offset h-m-s-ms">
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
