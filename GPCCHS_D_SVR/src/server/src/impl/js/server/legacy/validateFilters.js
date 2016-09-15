const ApiError = require('../lib/utils/apiError');
const constants = require('../lib/constants');
const parseDataFullName = require('../lib/utils/formula');

module.exports = (req, res, next) => {
  const filter = [];
  if (req.body && typeof req.body.filter !== 'undefined') {
    if (!Array.isArray(req.body.filter)) {
      return next(new ApiError(400, 'filter is invalid', '/body/filter'));
    }

    let error;
    const isError = req.body.filter.find((value, index) => {
      if (typeof value !== 'object') {
        error = new ApiError(400, 'filter rule is invalid', `/body/filter/${index}`);
        return true;
      }

      if (typeof value.dataFullName === 'undefined') {
        error = new ApiError(
          400,
          'filter rule dataFullName required',
          `/body/filter/${index}/dataFullName`
        );
        return true;
      }
      const parsedDataFullName = parseDataFullName(value.dataFullName);
      if (!parsedDataFullName) {
        error = new ApiError(
          400,
          'filter rule dataFullName is invalid',
          `/body/filter/${index}/dataFullName`
        );
        return true;
      }

      const rule = Object.assign({}, parsedDataFullName);

      if (typeof value.field === 'undefined') {
        error = new ApiError(400, 'filter rule field required', `/body/filter/${index}/field`);
        return true;
      }
      if (typeof value.field !== 'string' || value.field === '') {
        error = new ApiError(
          400,
          'filter rule field is invalid',
          `/body/filter/${index}/field`
        );
        return true;
      }
      rule.field = value.field;

      if (typeof value.operator === 'undefined') {
        error = new ApiError(
          400,
          'filter rule operator required',
          `/body/filter/${index}/operator`
        );
        return true;
      }
      if (typeof value.operator !== 'string'
        || [
          constants.FILTEROPERATOR_EQ,
          constants.FILTEROPERATOR_NE,
          constants.FILTEROPERATOR_LT,
          constants.FILTEROPERATOR_LE,
          constants.FILTEROPERATOR_GT,
          constants.FILTEROPERATOR_GE,
          constants.FILTEROPERATOR_CONTAINS,
          constants.FILTEROPERATOR_ICONTAINS,
        ].indexOf(value.operator) === -1) {
        error = new ApiError(
          400,
          'filter rule operator is invalid',
          `/body/filter/${index}/operator`
        );
        return true;
      }
      rule.operator = value.operator;

      if (typeof value.value === 'undefined') {
        error = new ApiError(
          400,
          'filter rule value required',
          `/body/filter/${index}/value`
        );
        return true;
      }
      if (value.value === '') {
        error = new ApiError(
          400,
          'filter rule value is invalid',
          `/body/filter/${index}/value`
        );
        return true;
      }
      rule.value = value.value;

      filter.push(rule);
      return false;
    });

    if (isError) {
      return next(error);
    }
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { filter });

  return next();
};
