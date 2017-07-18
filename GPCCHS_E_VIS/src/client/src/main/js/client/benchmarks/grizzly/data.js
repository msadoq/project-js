

export const data1000Points = () => {
  const points = [];
  for (let i = 0; i < 1000; i += 1) {
    points.push({
      x: 100000 + i,
      value: 500 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data1000Points2 = () => {
  const points = [];
  for (let i = 0; i < 1000; i += 1) {
    points.push({
      x: 100000 + i,
      value: 1100 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data10000Points = () => {
  const points = [];
  for (let i = 0; i < 10000; i += 1) {
    points.push({
      x: 100000 + (i / 10),
      value: 500 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data10000Points2 = () => {
  const points = [];
  for (let i = 0; i < 10000; i += 1) {
    points.push({
      x: 100000 + (i / 10),
      value: 1100 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data25000Points = () => {
  const points = [];
  for (let i = 0; i < 25000; i += 1) {
    points.push({
      x: 100000 + (i / 25),
      value: 600 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data25000Points2 = () => {
  const points = [];
  for (let i = 0; i < 25000; i += 1) {
    points.push({
      x: 100000 + (i / 25),
      value: 1200 + ((15 * i) % 500),
    });
  }
  return points;
};

export const data10000PointsColorChanging = () => {
  const points = [];
  for (let i = 0; i < 10000; i += 1) {
    points.push({
      x: 100000 + (i / 10),
      value: 500 + ((15 * i) % 500),
      color: `#AA${['0', '1', '2', '3', '4', '5', '6', '7', '9', 'A', 'C', 'D', 'E', 'F'][Math.round(Math.random() * 14)]}`,
    });
  }
  return points;
};
