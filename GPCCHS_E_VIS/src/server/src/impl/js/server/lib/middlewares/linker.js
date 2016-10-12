const { stringify } = require('querystring');

function flatten(o) {
  const flat = {};
  Object.keys(o).forEach(i => {
    if (!{}.hasOwnProperty.call(o, i)) {
      return;
    }

    if (typeof o[i] === 'undefined') {
      return;
    }

    if ((typeof o[i]) !== 'object' || o[i] === null) {
      flat[i] = o[i];
      return;
    }

    const flatObject = flatten(o[i]);
    Object.keys(flatObject).forEach(x => {
      if (!{}.hasOwnProperty.call(flatObject, x)) {
        return;
      }

      if (typeof flatObject[x] === 'undefined') {
        return;
      }

      if (x.indexOf('[') === -1) {
        flat[`${i}[${x}]`] = flatObject[x];
      } else {
        flat[`${i}[${x.substr(0, x.indexOf('['))}]${x.substr(x.indexOf('['))}`] = flatObject[x];
      }
    });
  });

  return flat;
}

module.exports = (req, res, next) => {
  res.linker = (route = '', params) => {
    const port = (req.app.get('port'))
      ? `:${req.app.get('port')}`
      : '';
    const query = (params && typeof params === 'object' && Object.keys(params).length)
      ? `?${stringify(flatten(params))}`
      : '';

    return `${req.protocol}://${req.hostname}${port}/${route}${query}`;
  };

  next();
};
