import { PropTypes } from 'react';

const { shape, number, string, bool, arrayOf } = PropTypes;

export const entryPointType = shape({
  id: string,
  name: string,
  parametric: bool.isRequired,
  connectedData: shape({
    axisId: string,
    digit: number,
    domain: string,
    filter: arrayOf(shape({
      field: string,
      operand: string,
      operator: string,
    })),
    format: string,
    formula: string,
    fieldX: string,
    timeline: string,
    unit: string,
  }),
});

export const axisType = shape({});
