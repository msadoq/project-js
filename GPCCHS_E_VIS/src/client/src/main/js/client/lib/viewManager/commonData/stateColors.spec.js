// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import _find from 'lodash/find';
import { getStateColorObj } from './stateColors';
import { get } from '../../common/configurationManager';


describe('viewManager', () => {
  describe('viewManager :: commonData', () => {
    describe('viewManager :: commonData :: stateColors', () => {
      test('getStateColorObj :: default values', () => {
        const payload = {};
        const customColors = [];
        const defaultStateColors = get('STATE_COLORS').nominal;
        const defaultNominalStateColor = _find(
          defaultStateColors,
            c => c.obsolete === false && c.significant === true
        );

        expect(getStateColorObj(payload, customColors, 'nominal')).toEqual({
          color: defaultNominalStateColor.color,
        });
      });
      test('getStateColorObj :: wrong configuration', () => {
        const payload = {
          isObsolete: {
            value: false,
          },
          isNominal: {
            value: true,
          },
        };
        const customColors = [];

        expect(getStateColorObj(payload, customColors, 'undefined')).toEqual({
          color: null,
        });
      });
      test('getStateColorObj :: not customizable value', () => {
        const payload = {
          validityState: {
            value: 2,
          },
        };
        const customColors = [];

        const defaultStateColors = get('STATE_COLORS').nominal;
        const defaultNominalStateColor = _find(
          defaultStateColors,
          c => c.obsolete === false && c.significant === true
        );

        expect(getStateColorObj(payload, customColors, 'nominal')).toEqual({
          color: defaultNominalStateColor.color,
        });
      });
    });
  });
});

