import PropTypes from 'prop-types';

export const connectedDataType = PropTypes.shape({
  axisId: PropTypes.string,
  digit: PropTypes.number,
  domain: PropTypes.string,
  filter: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    operand: PropTypes.string,
    operator: PropTypes.string,
  })),
  format: PropTypes.string,
  formula: PropTypes.string,
  fieldX: PropTypes.string,
  timeline: PropTypes.string,
  unit: PropTypes.string,
});

export const stateColorType = PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  condition: PropTypes.shape({
    field: PropTypes.string.isRequired,
    operand: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
  }),
});

export const entryPointType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  parametric: PropTypes.bool,
  connectedData: connectedDataType.isRequired,
  connectedDataParametric: PropTypes.shape({
    xAxisId: PropTypes.string,
    YAxisId: PropTypes.string,
  }),
  objectStyle: PropTypes.shape(),
  stateColors: PropTypes.arrayOf(stateColorType),
  obsolete: PropTypes.bool,
  nonsignificant: PropTypes.bool,
});

export const domainType = PropTypes.shape({
  domainId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  itemNamespace: PropTypes.string,
  oid: PropTypes.string,
  parentDomainId: PropTypes.number,
});

export const domainsType = PropTypes.arrayOf(domainType.isRequired);

export const timelineType = PropTypes.shape({
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  kind: PropTypes.string,
  offset: PropTypes.number,
  sessionName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
});

export const timelinesType = PropTypes.shape(timelineType.isRequired);

export const sessionType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  delta: PropTypes.PropTypes.number,
  missionEpoch: PropTypes.PropTypes.number,
  timestamp: PropTypes.PropTypes.shape({
    ms: PropTypes.PropTypes.number,
    ps: PropTypes.PropTypes.number,
  }),
});

export const sessionsType = PropTypes.arrayOf(sessionType.isRequired);

export const catalogItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const catalogType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.string, // when requesting
    PropTypes.arrayOf(catalogItemType),
  ]),
});

export const reduxFormFieldsType = {
  form: PropTypes.string.isRequired,
};

export const comObjectType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const TableConfigurationColumnType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  displayed: PropTypes.bool.isRequired,
});

export const fieldArrayPropsType = PropTypes.shape({
  push: PropTypes.func,
  remove: PropTypes.func,
  insert: PropTypes.func,
  getAll: PropTypes.func,
});

export const applicationProcessType = PropTypes.shape({
  apidRawValue: PropTypes.string,
  apidName: PropTypes.string,
});

export const applicationProcessesType = PropTypes.oneOfType([
  PropTypes.string, // when requesting
  PropTypes.arrayOf(applicationProcessType),
]);
