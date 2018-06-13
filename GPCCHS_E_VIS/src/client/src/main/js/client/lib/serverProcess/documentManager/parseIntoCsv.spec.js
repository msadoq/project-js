import * as _ from 'lodash';
import {
  CSV_COLUMN_SEPARATOR as COL_SEP,
  CSV_ROW_SEPARATOR as ROW_SEP,
} from 'constants';
import parseIntoCsv from './parseIntoCsv';
import testState from '../../common/jest/stateTest';

describe('consistency in parsing', () => {
  const plotViewId = 'plot1';
  const textViewId = 'text1';
  const dynamicViewId = 'dynamic1';
  const mimicViewId = 'mimic1';
  test('parsing result should not be empty', () => {
    const proceedWithView = (viewId) => {
      const result = parseIntoCsv.parseIntoCsv(testState, viewId);
      expect(result).not.toBe('');
    };
    proceedWithView(plotViewId);
    proceedWithView(textViewId);
    proceedWithView(dynamicViewId);
    proceedWithView(mimicViewId);
  });
  test('number of cols should be equal in every line in result', () => {
    const proceedWithView = (viewId) => {
      const result = parseIntoCsv.parseIntoCsv(testState, viewId);
      const arrayOfLines = _.split(result, ROW_SEP);
      const numberOfColumnsInHeader = _.split(arrayOfLines[0], COL_SEP).length;
      arrayOfLines.forEach(
        (line) => {
          const arrayOfColumns = _.split(line, COL_SEP);
          expect(arrayOfColumns.length).toEqual(numberOfColumnsInHeader);
        }
      );
    };
    proceedWithView(plotViewId);
    proceedWithView(textViewId);
    proceedWithView(dynamicViewId);
    proceedWithView(mimicViewId);
  });
});
