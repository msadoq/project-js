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
    axes: PropTypes.object,
    timelines: PropTypes.array,
    prefix: PropTypes.string,
    unit: PropTypes.string,
    axisId: PropTypes.string,
  }

  render() {
    const {
      axes,
      timelines,
      prefix,
      unit,
      axisId,
    } = this.props;
    let filteredAxes;
    if (axes && unit) {
      filteredAxes = Object.entries(axes)
        .map(a => ({
          ...a[1],
          axeId: a[0],
        })).filter(axe =>
          axe.unit === unit || axe.id === axisId
        );
    } else {
      filteredAxes = [];
    }

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
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        {/* <HorizontalFormGroup label="Format">
          <Field
            name={`${prefix}format`}
            component={ReactSelectField}
            clearable={false}
            options={formatOptions}
          />
        </HorizontalFormGroup> */}

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
            clearable={false}
            component={ReactSelectField}
            options={
              filteredAxes.map(axe => ({
                label: axe.label,
                value: axe.axeId,
              })).concat({
                label: '-',
                value: '',
              })
            }
          />
        </HorizontalFormGroup>}

        <FieldArray
          name={`${prefix}filter`}
          component={FiltersFields}
        />
      </div>
    );
  }
}
