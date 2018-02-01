import { PropTypes } from 'react';

const { shape, number, string, bool, arrayOf } = PropTypes;

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

export const stateColorType = shape({
  color: string.isRequired,
  condition: shape({
    field: string.isRequired,
    operand: string.isRequired,
    operator: string.isRequired,
  }),
});

export const entryPointType = shape({
  id: string,
  name: string,
  parametric: bool,
  connectedData: connectedDataType.isRequired,
  connectedDataParametric: shape({
    xAxisId: string,
    YAxisId: string,
  }),
  objectStyle: shape(),
  stateColors: arrayOf(stateColorType).isRequired,
  obsolete: bool,
  nonsignificant: bool,
});
