import { createSelector } from 'reselect';
import { getViewEntryPoints } from '../../../store/selectors/views';

const getInspectorOptions = createSelector(
  getViewEntryPoints,
  (entryPoints) => {
    const epName = Object.keys(entryPoints)[0];
    const ep = Object.values(entryPoints)[0];
    return {
      epName,
      epId: ep.id,
      dataId: ep.dataId,
      field: ep.field,
    };
  }
);

export default {
  getInspectorOptions,
};
