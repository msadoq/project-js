import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS140EntryPoint());
}

const getNewPUS140EntryPoint = () => ({
  name: 'PUS140EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus0140Model<Pus0140Model>',
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    apidName: null,
    apids: null,
  },
});
