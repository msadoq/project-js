import _ from 'lodash/fp';
import React from 'react';
import styles from './tooltip.scss';

/**
 * @param obj
 * @returns {*}
 */
export const createTableData =
  obj => (
    <table className={styles.popoverTable}>
      <tbody>
        {
          Object.keys(obj).map(
            key => (
              <tr>
                <td>{key}</td>
                <td>{obj[key]}</td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  );

/**
 * @param cellContent = { // content of a single cell of the VirtualizedTableView
 *   colKey: 'status', // table column key on which depends that cell
 *   color: undefined, // color of the text of that column
 *   value: 'DISABLED', // value of that cell
 * }
 * @param content = { // whole line content (here example for a pus11 subSchedule line
 *   lastUpdateModeExecTimeFirstTc: 1,
 *   lastUpdateModeStatus: 'TC',
 *   lastUpdateModeSubScheduleId: 'TC',
 *   lastUpdateTimeExecTimeFirstTc: 1531292340608,
 *   lastUpdateTimeStatus: 1531292340608,
 *   lastUpdateTimeSubscheduleId: 1531292340608,
 *   serviceApid: 100,
 *   serviceApidName: 'myString',
 *   ssId: 100,
 *   ssIdLabel: 'myString',
 *   status: 'DISABLED',
 *   uniqueId: 1531292340608,
 * }
 * @param displayObj = { // what to render in the popup. Example from the pus11 Subschedule status cell
 *   lastUpdateModeStatus: {
 *     key: 'lastUpdateModeStatus',
 *   },
 *   lastUpdateTimeStatus: {
 *     key: 'lastUpdateTimeStatus',
 *     format: () => (), // format function to render that value
 *   },
 * }
 * @returns {{tooltip: {body: *}}}
 */
export const addTooltipWithContent = (cellContent, content, displayObj) => {
  const keys = Object.keys(displayObj);

  return ({
    ...cellContent,
    tooltip: {
      body: createTableData(keys.reduce((acc, cur) => {
        const currentContent = displayObj[cur];
        const value = content[currentContent.key];
        const format = currentContent.format || _.identity;

        return ({
          ...acc,
          [cur]: format(value),
        });
      }, {})),
    },
  });
};
