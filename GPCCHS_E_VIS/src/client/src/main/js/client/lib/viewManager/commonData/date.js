import moment from 'moment';
import parameters from 'common/configurationManager';

export const TAI = 'TAI';

export default function dateFormat(date, format = null) {
  switch (format) {
    case TAI: {
      return moment(date).format(parameters.get('DATE_FORMAT_TAI'));
    }
    default:
      return moment(date).utc().toISOString();
  }
}
