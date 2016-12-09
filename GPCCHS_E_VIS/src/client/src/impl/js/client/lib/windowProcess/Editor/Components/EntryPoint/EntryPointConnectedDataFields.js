import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {
  InputField,
  TextareaField,
  ReactSelectField
} from '../Fields/';
import {
  HorizontalFormGroup,
} from '../Forms/';
import {
  unitOptions,
  formatOptions,
} from './connectedDataOptions';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class EntryPointConnectedDataFields extends React.Component {
  static propTypes = {
    axes: PropTypes.object,
    timelines: PropTypes.array,
    prefix: PropTypes.string,
  }

  render() {
    const {
      axes,
      timelines,
      prefix,
    } = this.props;

    return (
      <div>
        <HorizontalFormGroup label="Formula">
          <Field
            name={`${prefix}formula`}
            component={TextareaField}
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name={`${prefix}unit`}
            component={ReactSelectField}
            clearable={false}
            options={unitOptions}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Format">
          <Field
            name={`${prefix}format`}
            component={ReactSelectField}
            clearable={false}
            options={formatOptions}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Domain">
          <Field
            name={`${prefix}domain`}
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <Field
            name={`${prefix}timeline`}
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

        {axes && <HorizontalFormGroup label="Axis">
          <Field
            name={`${prefix}axisId`}
            className="form-control input-sm"
            component="select"
          >
            {Object.keys(axes).map((axisId) => {
              const axis = axes[axisId];
              return (
                <option key={axisId} value={axisId}>{axis.label}</option>
              );
            })}
          </Field>
        </HorizontalFormGroup>}
      </div>
    );
  }
}
