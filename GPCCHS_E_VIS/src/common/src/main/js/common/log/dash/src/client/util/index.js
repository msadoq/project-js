export const fixDecimals = (num, nb = 2) => Number(num.toFixed(nb));

export const bytesToMB = bytes => fixDecimals(bytes / (1 * 1000 * 1000), 2);

export const displayNumber = n => `${n < 10 ? '0' : ''}${n}`;

export const formatDate = (milliseconds) => {
  const d = new Date(milliseconds);
  return `${displayNumber(d.getHours())}h${displayNumber(d.getMinutes())}m${displayNumber(d.getSeconds())}s`;
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
