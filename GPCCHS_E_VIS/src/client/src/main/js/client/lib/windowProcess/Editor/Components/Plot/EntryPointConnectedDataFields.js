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
const EntryPointConnectedDataFields = (props) => {
  const {
    axes,
    timelines,
    prefix,
    unit,
    axisId,
    timeBasedData,
  } = props;
  let filteredAxes;
  if (axes && unit) {
    filteredAxes = Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axeId: key,
      })).filter(axe =>
        axe.unit === unit || axe.id === axisId
      );
  } else {
    filteredAxes = [];
  }

  if (timeBasedData) {
    return (
      <div>
        <HorizontalFormGroup label="Formula">
          <Field
            name={`${prefix}formula`}
            component={TextareaField}
            rows="4"
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
          {axes &&
            <p
              style={{ fontSize: '0.9em', paddingTop: '2px' }}
            >
              { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
            </p>
          }
        </HorizontalFormGroup>
      </div>
    );
  }

  return (
    <div>
      <HorizontalFormGroup label="Formula">
        <Field
          name={`${prefix}formula`}
          component={TextareaField}
          rows="4"
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
        {axes &&
          <p
            style={{ fontSize: '0.9em', paddingTop: '2px' }}
          >
            { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
          </p>
        }
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

      <HorizontalFormGroup label="Axis">
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
      </HorizontalFormGroup>

      { prefix === 'y.' && <FieldArray
        name={`${prefix}filter`}
        component={FiltersFields}
      /> }
    </div>
  );
};

EntryPointConnectedDataFields.propTypes = {
  axes: PropTypes.shape({}).isRequired,
  timelines: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    id: PropTypes.string,
    kind: PropTypes.string,
    offset: PropTypes.number,
    sessionId: PropTypes.number,
    timelineId: PropTypes.string,
  })).isRequired,
  prefix: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  axisId: PropTypes.string.isRequired,
  timeBasedData: PropTypes.bool,
};
EntryPointConnectedDataFields.defaultProps = {
  timeBasedData: false,
};
export default EntryPointConnectedDataFields;
