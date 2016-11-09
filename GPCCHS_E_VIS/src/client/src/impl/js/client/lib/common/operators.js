
import globalConstants from 'common/constants';

export default {
  '=': globalConstants.FILTERTYPE_EQ,
  '!=': globalConstants.FILTERTYPE_NE,
  '<': globalConstants.FILTERTYPE_LT,
  '<=': globalConstants.FILTERTYPE_LE,
  '>': globalConstants.FILTERTYPE_GT,
  '>=': globalConstants.FILTERTYPE_GE,
  contains: globalConstants.FILTERTYPE_CONTAINS,
  icontains: globalConstants.FILTERTYPE_ICONTAINS,
};
