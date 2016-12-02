export const fixDecimals = (num, nb) => Number(num.toFixed(nb));

export const bytesToMB = bytes => fixDecimals(bytes / (1 * 1000 * 1000), 2);

export const displayNumber = n => `${n < 10 ? '0' : ''}${n}`;

export const formatDate = (milliseconds) => {
  const d = new Date(milliseconds);
  return `${displayNumber(d.getHours())}h${displayNumber(d.getMinutes())}m${displayNumber(d.getSeconds())}s`;
};
