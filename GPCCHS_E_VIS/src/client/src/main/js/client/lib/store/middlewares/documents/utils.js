import _ from 'lodash/fp';
import parameters from 'common/configurationManager';
import { getWorkspaceFolder } from 'store/reducers/hsc';
import { EXTENSIONS } from 'constants';

export const isView = docType => /^.*View$/.test(docType);

const getFilter = docType => (
  { name: docType, extensions: [EXTENSIONS[docType]] }
);

const allViewsFilters = _.keys(EXTENSIONS).filter(isView).map(getFilter);
const allViewsExtensions = _.flatMap(_.get('extensions'), allViewsFilters);

export const getOpenExtensionsFilters = (docType) => {
  if (docType && !isView(docType)) {
    return [getFilter(docType)];
  }
  return [
    { name: 'Any VIMA views', extensions: allViewsExtensions },
    ...allViewsFilters,
  ];
};

export const getSaveExtensionsFilters = docType => [getFilter(docType)];

// warning, this selector is impure, do not memoize it
export const getDefaultFolder = state => (
  getWorkspaceFolder(state) || parameters.get('ISIS_DOCUMENTS_ROOT')
);
