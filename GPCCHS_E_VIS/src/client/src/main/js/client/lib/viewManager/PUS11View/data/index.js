/* eslint-disable import/prefer-default-export */
import { filter, sort } from '../../common/data/table';

const _cell = value => ({
  value,
  tooltip: {
    title: 'Tooltip title',
    body: 'Tooltip body',
    placement: 'right', // default right, possible values top, right, bottom, left
  },
});

/**
 * Format subSchedule table rows
 *
 * @param data
 * @param config
 * @returns {*}
 */
export const formatSubScheduleRows = (data, config) => {
  const subSchedulesConfig = config.tables.subSchedules;

  const formattedData = data.map(
    row => [
      _cell(row.ssid),
      _cell(row.apid),
      _cell(row.name),
      _cell(row.status),
      _cell(row.firstTCTime),
    ]);

  return {
    totalCount: formattedData.length,
    rows: sort(filter(formattedData, subSchedulesConfig), subSchedulesConfig),
  };
};
