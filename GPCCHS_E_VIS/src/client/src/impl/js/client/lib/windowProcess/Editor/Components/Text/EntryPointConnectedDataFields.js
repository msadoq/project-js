import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import {
  InputField,
  TextareaField,
  ReactSelectField,
  FiltersFields,
} from '../Fields/';
import {
  HorizontalFormGroup,
} from '../Forms/';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class EntryPointConnectedDataFields extends React.Component {
  static propTypes = {
    timelines: PropTypes.array,
  }

  render() {
    const {
      timelines,
    } = this.props;

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
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <Field
            name="timeline"
            clearable={false}
            component={ReactSelectField}
            free
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
  }
}
