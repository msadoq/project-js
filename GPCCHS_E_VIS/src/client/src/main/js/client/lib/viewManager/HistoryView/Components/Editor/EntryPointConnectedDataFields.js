import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import FiltersFields from 'viewManager/commonEditor/Fields/FiltersFields';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import TextareaField from 'windowProcess/commonReduxForm/TextareaField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
const EntryPointConnectedDataFields = (props) => {
  const {
    timelines,
    domains,
  } = props;
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
          options={timelines.map(t =>
            ({
              label: t.id,
              value: t.id,
            })
          ).concat({
            label: '*',
            value: '*',
          })}
        />
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
};

export default EntryPointConnectedDataFields;
