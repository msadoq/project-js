import _ from 'lodash/fp';
import { VM_VIEW_PUS11 } from '../constants';

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS11,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS11)',
  configuration: {
    tables: [
      {
        sorting: {},
        filters: {},
        /*
        columns: [
          [
            null,
            [
              { field: 'referenceTimestamp', isDisplayed: true },
              { field: 'epName', isDisplayed: true },
              { field: 'unit', isDisplayed: true },
            ],
          ],
        ],
        */
      },
    ],
  },
}, view);

export default _.pipe(
  getDefaultView
);
