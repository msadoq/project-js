import {
  CSV_COLUMN_SEPARATOR as COL_SEP,
  CSV_ROW_SEPARATOR as ROW_SEP,
} from 'constants';
import {
  VM_VIEW_PLOT,
  VM_VIEW_TEXT,
  VM_VIEW_DYNAMIC,
  VM_VIEW_MIMIC,
  VM_VIEW_PACKET,
  VM_VIEW_HISTORY,
  VM_VIEW_GROUNDALARM,
  VM_VIEW_ONBOARDALARM,
} from 'viewManager/constants';

import { getView } from 'store/reducers/views';

const parseVector = vector => vector.map(e => e).join(COL_SEP).concat(COL_SEP);

const parseIntoCsv = (state, viewId) => {
  const view = getView(state, { viewId });
  switch (view.type) {
    case VM_VIEW_PLOT: {
      const plotViewData = state.PlotViewData[viewId];
      const plotViewEntries = Object.entries(plotViewData.lines);
      const entryPointsArray = Array.from(plotViewEntries);
      return entryPointsArray.map((x) => {
        const subarray = Array.from(x);
        const entryPointName = subarray[0];
        const entryPointData = Object.entries(subarray[1]);
        /* const parseVector = vector => (
          vector[0] + COL_SEP
            + vector[1] + COL_SEP
            + vector[2] + COL_SEP
            + vector[3] + COL_SEP
            + vector[4] + COL_SEP
            + vector[5] + COL_SEP
            + vector[6] + COL_SEP
        ); */
        function oneRowKeys(arrayEntry) {
          return entryPointName + COL_SEP
            + arrayEntry[0] + COL_SEP
            + parseVector(Object.keys(arrayEntry[1]));
        }
        function oneRowContent(arrayEntry) {
          return entryPointName + COL_SEP
            + arrayEntry[0] + COL_SEP
            + parseVector(Object.values(arrayEntry[1]));
        }
        const header = (entryPointData.length === 0
          ? ''
          : oneRowKeys(entryPointData[0]) + ROW_SEP
        );
        return header + entryPointData.map(oneRowContent).join(ROW_SEP);
      }
      ).join(ROW_SEP);
    }
    case VM_VIEW_TEXT: {
      const textViewMetadata =
        `entry point${COL_SEP}data${COL_SEP}value${COL_SEP}${ROW_SEP}`;
      const textViewData = state.TextViewData[viewId];
      const textViewEntries = Object.entries(textViewData.values);
      const getTextViewCSV = element => (
        element[0] + COL_SEP
          + textViewData.index[element[0]] + COL_SEP
          + Object.values(element[1])[0] + COL_SEP
      );
      return textViewMetadata.concat(
        textViewEntries
          .map(getTextViewCSV)
          .join(ROW_SEP)
      );
    }
    case VM_VIEW_GROUNDALARM: {
      const groundAlarmViewData = state.GroundAlarmViewData[viewId];
      const groundAlarmViewEntries = Object.entries(groundAlarmViewData.lines);
      const firstElement = groundAlarmViewEntries[0][1];
      /* const parseVector = vector => (
          vector[0] + COL_SEP +
          vector[1] + COL_SEP +
          vector[2] + COL_SEP +
          vector[3] + COL_SEP +
          vector[4] + COL_SEP +
          vector[5] + COL_SEP +
          vector[6] + COL_SEP +
          vector[7] + COL_SEP +
          vector[8] + COL_SEP +
          vector[9] + COL_SEP +
          vector[10] + COL_SEP +
          vector[11] + COL_SEP +
          vector[12] + COL_SEP +
          vector[13] + COL_SEP +
          vector[14] + COL_SEP +
          vector[15] + COL_SEP +
          vector[16] + COL_SEP
    ); */
      const header = (groundAlarmViewEntries.length === 0)
        ? ''
        : 'index'.concat(COL_SEP).concat(parseVector(Object.keys(firstElement)));
      const getGroundAlarmViewCSV = element => (
        element[0] + COL_SEP + parseVector(Object.values(element[1]))
      );
      return header + ROW_SEP
        + groundAlarmViewEntries.map(getGroundAlarmViewCSV).join(ROW_SEP);
    }
    case VM_VIEW_DYNAMIC: {
      const data = state.DynamicViewData[viewId];
      const keysVect = Object.keys(data.value.decommutedValues[0]);
      const parseVect = vector => (vector[0]
        + COL_SEP + vector[1]
        + COL_SEP + vector[2]
        + COL_SEP + vector[3]
        + COL_SEP + vector[4]
        + COL_SEP
      );
      const parseDecomVal = element => (data.index
        + COL_SEP + Object.values(element)[0].value
        + COL_SEP + Object.values(element)[1].value
        + COL_SEP + Object.values(element)[2].value
        + COL_SEP + Object.values(element)[3].value
        + COL_SEP + Object.values(element)[4].value
        + COL_SEP + data.value.groundDate.value
        + COL_SEP + data.value.isNominal.value
        + COL_SEP + data.value.onboardDate.value
        + COL_SEP + data.value.referenceTimestamp.value
        + COL_SEP
      );
      const dynamicViewHeader =
        `index${COL_SEP}${parseVect(keysVect)}groundDate${COL_SEP}isNominal${COL_SEP}onboardDate${COL_SEP}referenceTimestamp${COL_SEP}`;
      const result = dynamicViewHeader + ROW_SEP
        + data.value.decommutedValues.map(parseDecomVal).join(ROW_SEP);
      return result;
    }
    case VM_VIEW_MIMIC: {
      const mimicViewMetadata = `entry point${COL_SEP}date${COL_SEP}value${COL_SEP}${ROW_SEP}`;
      const mimicViewData = state.MimicViewData[viewId];
      const mimicViewEntries = Object.entries(mimicViewData.values);
      const getMimicViewCSV = element => (
        element[0] + COL_SEP
          + mimicViewData.index[element[0]] + COL_SEP
          + Object.values(element[1])[0] + COL_SEP
      );
      return mimicViewMetadata.concat(
        mimicViewEntries
          .map(getMimicViewCSV)
          .join(ROW_SEP)
      );
    }
    case VM_VIEW_PACKET: {
      return ('');
    }
    case VM_VIEW_HISTORY: {
      return ('');
    }
    case VM_VIEW_ONBOARDALARM: {
      const onboardAlarmViewMetadata = parseVector(['index', 'ackState', 'onBoardDate', 'index', 'satellite', 'telemetryType', 'timestamp', 'alarmType', 'RIDId', 'reportNameexercitation', 'reportType', '', '', '', '']) + ROW_SEP;
//        `index${COL_SEP}ackState${COL_SEP}onBoardDate${COL_SEP}index${COL_SEP}satellite${COL_SEP}telemetryType${COL_SEP}timestamp${COL_SEP}alarmType${COL_SEP}RIDId${COL_SEP}reportNameexercitation${COL_SEP}reportType${COL_SEP}${COL_SEP}${COL_SEP}${COL_SEP}${ROW_SEP}`;
      const onboardAlarmViewData = state.OnboardAlarmViewData[viewId];
      const onboardAlarmViewEntries = Object.entries(onboardAlarmViewData.lines);
      const onboardAlarmViewCSV = (element) => {
        const parseSubentry = subentry => (
          Object.values(subentry[1])[1] + COL_SEP
        );
        const subentries10 = Object.entries(Object.values(element[1])[10]);
        const subentries11 = Object.entries(Object.values(element[1])[11]);
        return element[0] + COL_SEP
          + Object.values(element[1])[0] + COL_SEP
          + Object.values(element[1])[1] + COL_SEP
          + Object.values(element[1])[2] + COL_SEP
          + Object.values(element[1])[3] + COL_SEP
          + Object.values(element[1])[4] + COL_SEP
          + Object.values(element[1])[5] + COL_SEP
          + Object.values(element[1])[6] + COL_SEP
          + Object.values(element[1])[7] + COL_SEP
          + Object.values(element[1])[8] + COL_SEP
          + Object.values(element[1])[9] + COL_SEP
          + subentries10.map(parseSubentry).join('')
          + Object.values(subentries11)[0][1];
      };
      return onboardAlarmViewMetadata.concat(
        onboardAlarmViewEntries
          .map(onboardAlarmViewCSV)
          .join(ROW_SEP)
      );
    }
    default: {
      return ('');
    }
  }
};

export default {
  parseIntoCsv,
};

// -------------------------------------------------------------------------- //
