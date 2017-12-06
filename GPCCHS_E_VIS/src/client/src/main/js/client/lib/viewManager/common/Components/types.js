import { PropTypes } from 'react';

const { shape, number, string, bool, arrayOf, object } = PropTypes;

export const connectedDataType = shape({
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
});

export const entryPointType = shape({
  id: string,
  name: string,
  parametric: bool.isRequired,
  connectedData: connectedDataType.isRequired,
  connectedDataParametric: shape({
    xAxisId: string,
    YAxisId: string,
  }),
  objectStyle: shape(),
  stateColors: object.isRequired,
  obsolete: bool,
  nonsignificant: bool,
});
