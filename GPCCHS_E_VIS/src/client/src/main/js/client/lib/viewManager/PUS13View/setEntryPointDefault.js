import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS13EntryPoint());
}

const getNewPUS13EntryPoint = () => ({
  name: 'PUS13EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus013Model<Pus013Model>',
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
