module.exports = {
  encode: data => ({
    method: data.method,
    requestId: data.requestId,
    isLast: data.isLast,
    isError: data.isError,
  }),
  decode: data => ({
    method: data.method,
    requestId: data.requestId,
    isLast: data.isLast,
    isError: data.isError,
  }),
};