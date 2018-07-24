import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS12EntryPoint());
}

const getNewPUS12EntryPoint = () => ({
  name: 'PUS12EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus012Model<Pus012Model>',
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
