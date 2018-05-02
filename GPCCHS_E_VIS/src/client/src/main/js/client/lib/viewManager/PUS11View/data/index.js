/* eslint-disable import/prefer-default-export */
import { filter, sort } from '../../common/data/table';

const _cell = value => ({
  value,
});

/**
 * Format subSchedule table rows
 * TODO: use config to filter or sort data
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

  return sort(filter(formattedData, subSchedulesConfig), subSchedulesConfig);
};
