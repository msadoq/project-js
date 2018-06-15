// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// END-HISTORY
// ====================================================================

import parseEntryPoint from './parseEntryPoint';
import getExpectedInterval from './intervalManagement';
import { sort, filter } from '../../common/data/table';


export const formatHistoryRows = (data, config) => ({
  totalCount: data.length,
  rows: sort(filter(data, config), config),
});


export default {
  parseEntryPoint,
  getExpectedInterval,
};
