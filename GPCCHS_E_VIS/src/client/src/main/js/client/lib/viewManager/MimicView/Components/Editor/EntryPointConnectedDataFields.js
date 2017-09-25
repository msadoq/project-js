import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import FiltersFields from '../../../commonEditor/Fields/FiltersFields';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import TextareaField from '../../../../windowProcess/commonReduxForm/TextareaField';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
const EntryPointConnectedDataFields = (props) => {
  const {
    timelines,
    domains,
    timeline,
  } = props;

  let availableTimelines = [];
  const noCorrespondingTimeline = !timelines.find(t => t.id === timeline) && timeline !== '*';
  if (timelines) {
    availableTimelines = timelines.map(t =>
      ({
        label: t.id,
        value: t.id,
      })
    ).concat({
      label: '*',
      value: '*',
    })
    .concat(
      noCorrespondingTimeline ?
      { label: timeline, value: timeline, disabled: true } : []
    );
  }

  return (
    <div>
      <HorizontalFormGroup label="Formula">
        <Field
          name="formula"
          component={TextareaField}
          rows="4"
          className="form-control input-sm"
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Unit">
        <Field
          name="unit"
          component={InputField}
          type="text"
          className="form-control input-sm"
        />
      </HorizontalFormGroup>

      {/* <HorizontalFormGroup label="Format">
        <Field
          name="format"
          component={ReactSelectField}
          clearable={false}
          options={formatOptions}
        />
      </HorizontalFormGroup> */}

      <HorizontalFormGroup label="Domain">
        <Field
          name="domain"
          clearable={false}
          component={ReactSelectField}
          options={domains.map(d =>
            ({
              label: d.name,
              value: d.name,
            })
          ).concat({
            label: '*',
            value: '*',
          })}
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Timeline">
        <Field
          name="timeline"
          clearable={false}
          component={ReactSelectField}
          free
          options={availableTimelines}
        />
        {
          noCorrespondingTimeline &&
          <span className="text-danger">No corresponding timeline, create it or change it</span>
        }
      </HorizontalFormGroup>

      <FieldArray
        name="filter"
        component={FiltersFields}
      />
    </div>
  );
};

EntryPointConnectedDataFields.propTypes = {
  timelines: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  timeline: PropTypes.string,
};

EntryPointConnectedDataFields.defaultProps = {
  timeline: null,
};

export default EntryPointConnectedDataFields;
