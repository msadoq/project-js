import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS15EntryPoint());
}

const getNewPUS15EntryPoint = () => ({
  name: 'PUS15EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus015Model<Pus015Model>', // fixed
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
