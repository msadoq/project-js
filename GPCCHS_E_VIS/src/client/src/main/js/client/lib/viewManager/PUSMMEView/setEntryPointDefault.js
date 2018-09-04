import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUSMMEEntryPoint());
}

const getNewPUSMMEEntryPoint = () => ({
  name: 'PUSMMEEP',
  id: v4(),
  connectedData: {
    formula: 'PusGroundModelDefinition.PusMmeModel<PusMmeModel>',
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
