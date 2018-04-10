// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in
//  windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 2.0.0 : FA : ISIS-FT-2311 : 31/10/2017 : Timeline's offset is now expressed in
//  d-h-m-s-ms format.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import { schemeCategory20b } from 'd3-scale';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import OffsetFields from './OffsetFields';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class TimelineFields extends PureComponent {
  static propTypes = {
    disableSubmit: PropTypes.func.isRequired,
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
    id: PropTypes.string,
    masterId: PropTypes.string,
    uuid: PropTypes.string,
  }

  static defaultProps = {
    masterId: null,
    id: null,
    uuid: null,
  }

  render() {
    const {
      timelines,
      sessions,
      id,
      masterId,
      uuid,
      disableSubmit,
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
              if (timelines.find(t => t.id === val && t.uuid !== uuid)) {
                return 'This id is already taken';
              }
              return undefined;
            }}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Session">
          <Field
            name="sessionName"
            component="select"
            type="text"
            className="form-control input-sm"
          >
            {sessions.map(session =>
              <option key={session.id} value={session.name}>{session.name}</option>
            )}
          </Field>
        </HorizontalFormGroup>

        <hr />

        <HorizontalFormGroup label="Offset (d-h-m-s-ms)">
          <Field
            name="offset"
            disableSubmit={disableSubmit}
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
