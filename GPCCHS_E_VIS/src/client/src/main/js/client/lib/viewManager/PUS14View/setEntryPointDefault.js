import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS14EntryPoint());
}

const getNewPUS14EntryPoint = () => ({
  name: 'PUS14EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus014Model<Pus014Model>', // fixed
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
