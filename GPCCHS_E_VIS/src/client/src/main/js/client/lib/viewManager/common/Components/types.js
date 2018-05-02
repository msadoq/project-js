import PropTypes from 'prop-types';

const { func, shape, number, string, bool, arrayOf, oneOfType } = PropTypes;

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

export const domainType = shape({
  domainId: number.isRequired,
  name: string.isRequired,
  itemNamespace: string,
  oid: string,
  parentDomainId: number,
});

export const domainsType = arrayOf(domainType.isRequired);

export const timelineType = shape({
  color: string,
  id: string.isRequired,
  kind: string,
  offset: number,
  sessionName: string.isRequired,
  uuid: string.isRequired,
});

export const timelinesType = arrayOf(timelineType.isRequired);

export const sessionType = shape({
  id: number.isRequired,
  name: string.isRequired,
  delta: PropTypes.number,
  missionEpoch: PropTypes.number,
  timestamp: PropTypes.shape({
    ms: PropTypes.number,
    ps: PropTypes.number,
  }),
});

export const sessionsType = arrayOf(sessionType.isRequired);

export const catalogItemType = shape({
  name: string.isRequired,
});

export const catalogType = shape({
  name: string.isRequired,
  items: oneOfType([
    string, // when requesting
    arrayOf(catalogItemType),
  ]),
});

export const reduxFormFieldsType = {
  form: string.isRequired,
};

export const comObjectType = shape({
  name: string.isRequired,
  type: string.isRequired,
});

export const TableConfigurationColumnType = shape({
  title: string.isRequired,
  value: string.isRequired,
  position: number.isRequired,
  displayed: bool.isRequired,
  group: number,
});

export const fieldArrayPropsType = shape({
  push: func,
  remove: func,
  insert: func,
  getAll: func,
});

export const applicationProcessType = shape({
  APId: number,
  name: string,
});

export const applicationProcessesType = arrayOf(applicationProcessType.isRequired);
