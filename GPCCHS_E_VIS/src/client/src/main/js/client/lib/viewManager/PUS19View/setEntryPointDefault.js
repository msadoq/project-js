import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS19EntryPoint());
}

const getNewPUS19EntryPoint = () => ({
  name: 'PUS19EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus019Model<Pus019Model>', // fixed
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
