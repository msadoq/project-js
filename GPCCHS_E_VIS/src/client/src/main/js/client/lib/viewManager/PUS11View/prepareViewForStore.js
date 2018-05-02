import _ from 'lodash/fp';
import { VM_VIEW_PUS11 } from '../constants';

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS11,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS11)',
  configuration: {
    tables: {
      subSchedules: {
        sorting: {},
        filters: {},
        columns: [
          { name: 'SSID', isDisplayed: true },
          { name: 'APID', isDisplayed: true },
          { name: 'Name', isDisplayed: true },
          { name: 'Status', isDisplayed: true },
          { name: 'First TC Time', isDisplayed: true },
        ],
      },
    },
  },
}, view);

export default _.pipe(
  getDefaultView
);
