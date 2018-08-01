import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS144EntryPoint());
}

const getNewPUS144EntryPoint = () => ({
  name: 'PUS144EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus0144Model<Pus0144Model>', // fixed
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
