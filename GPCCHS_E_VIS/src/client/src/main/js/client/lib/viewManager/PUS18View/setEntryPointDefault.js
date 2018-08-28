import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS18EntryPoint());
}

const getNewPUS18EntryPoint = () => ({
  name: 'PUS18EP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.Pus018Model<Pus018Model>',
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
