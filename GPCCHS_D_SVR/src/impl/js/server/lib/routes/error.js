// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const title = err.message;
  let source;
  if (err.source) {
    source = {
      pointer: err.source,
    };
  }

  let detail;
  if (req.app.get('env') === 'development') {
    detail = {
      name: err.name,
      fileName: err.fileName,
      lineNumber: err.lineNumber,
      columnNumber: err.columnNumber,
      stack: err.stack,
    };
  }

  res.status(status).json({
    errors: [{
      status,
      source,
      title,
      detail,
    }],
  });
};
