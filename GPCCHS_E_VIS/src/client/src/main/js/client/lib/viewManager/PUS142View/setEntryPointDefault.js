import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS142EntryPoint());
}

const getNewPUS142EntryPoint = () => ({
  name: 'PUS142EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus0142Model<Pus0142Model>', // fixed
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
