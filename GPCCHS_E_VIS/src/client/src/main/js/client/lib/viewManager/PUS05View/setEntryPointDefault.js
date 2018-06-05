import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPUS05EntryPoint());
}

const getNewPUS05EntryPoint = () => ({
  name: 'PUS05EP',
  id: v4(),
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    session: get('WILDCARD_CHARACTER'),
    apidName: null,
    apidRawValue: null,
  },
});
