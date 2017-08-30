export const scaleAnimation = (data, g) => {
  const el = g.el;
  if (!el) {
    return;
  }
  let value;
  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      value = g.defaultValue;
    } else {
      el.style.visibility = 'hidden';
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let ratio = (value - g.domain[0]) / (g.domain[1] - g.domain[0]);
  ratio = ratio < 0 ? 0 : ratio;
  if (g.type === 'scaleY') {
    el.style.transform = `scaleY(${ratio})`;
  } else {
    el.style.transform = `scaleX(${ratio})`;
  }
  el.style.visibility = 'visible';
  el.style.transformOrigin = g.fixed || 'bottom';
};

export const translateAnimation = (data, g) => {
  const el = g.el;
  if (!el) {
    return;
  }
  let value;
  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      value = g.defaultValue;
    } else {
      el.style.visibility = 'hidden';
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let distance = ((value - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.width;
  distance = distance < 0 ? 0 : distance;
  distance = distance > g.width ? g.width : distance;
  if (g.type === 'translateY') {
    if (g.direction === 'top') {
      distance *= -1;
    }
    el.style.transform = `translate(0px, ${distance}px)`;
  } else {
    if (g.direction === 'left') {
      distance *= -1;
    }
    el.style.visibility = 'visible';
    el.style.transform = `translate(${distance}px, 0px)`;
  }
};

export const rotateAnimation = (data, g) => {
  const el = g.el;
  if (!el) {
    return;
  }
  let value;
  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      value = g.defaultValue;
    } else {
      el.style.visibility = 'hidden';
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let angle = ((value - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.angle;
  angle = angle < 0 ? 0 : angle;
  angle = angle > g.angle ? g.angle : angle;
  el.style.transformOrigin = `${g.center[0]}px ${g.center[1]}px`;
  el.style.transform = `rotate(${angle}deg)`;
};

export const textBoxAnimation = (data, g) => {
  const el = g.el;
  const elBg = g.elBg;
  if (!el || !elBg) {
    return;
  }
  const SVGRect = el.getBBox();

  elBg.setAttribute('width', SVGRect.width);
  elBg.setAttribute('height', SVGRect.height);
  elBg.setAttribute('y', SVGRect.y);

  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      el.style.fill = g.defaultValue[0];
      elBg.style.fill = g.defaultValue[1];
      el.innerHTML = g.defaultValue[2];
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
    }
    return;
  }
  const value = data.values[g.epName].value;

  el.innerHTML = isNaN(value) ? value : Math.round(value * 100) / 100;
  let fillText = '#000';
  let fillBg = '';
  for (let i = 0; i < g.textColorThresholds.length; i += 1) {
    const stateColor = g.textColorThresholds[i].split('|');
    if (value > stateColor[0]) {
      fillText = stateColor[1];
    }
  }
  for (let i = 0; i < g.textColorRegex.length; i += 1) {
    const stateColor = g.textColorRegex[i].split('=');
    const regex = RegExp(stateColor[0]);
    if (value.match(regex)) {
      fillText = stateColor[1];
    }
  }
  el.style.fill = fillText;
  el.style.visibility = 'visible';
  for (let i = 0; i < g.bgColorLevels.length; i += 1) {
    const stateColor = g.bgColorLevels[i].split('$');
    if (value > stateColor[0]) {
      fillBg = stateColor[1];
    }
  }
  elBg.style.fill = fillBg;
  elBg.style.fillOpacity = fillBg === '' ? 0 : 1;
};

export const colourAnimation = (data, g) => {
  const el = g.el;
  if (!el) {
    return;
  }
  let color;
  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      color = g.defaultValue;
    } else {
      el.style.visibility = 'hidden';
      return;
    }
  } else {
    const value = data.values[g.epName].value;
    for (let i = 0; i < g.operators.length; i += 1) {
      const stateColor = g.operators[i].split('$');
      if (stateColor[0] === '=' && value === stateColor[1]) {
        color = stateColor[2];
      } else if (stateColor[0] === '!=' && value !== stateColor[1]) {
        color = stateColor[2];
      } else if (stateColor[0] === '>' && value > stateColor[1]) {
        color = stateColor[2];
      } else if (stateColor[0] === '>=' && value >= stateColor[1]) {
        color = stateColor[2];
      } else if (stateColor[0] === '<' && value < stateColor[1]) {
        color = stateColor[2];
      } else if (stateColor[0] === '<=' && value <= stateColor[1]) {
        color = stateColor[2];
      }
    }
  }
  el.style.visibility = 'visible';
  const nodes = el.childNodes;
  if (color) {
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].style) {
        nodes[i].style.fill = color;
      }
    }
  }
};

export const showAnimation = (data, g) => {
  const el = g.el;
  if (!el) {
    return;
  }
  if (!data.values[g.epName] || !data.values[g.epName].value) {
    el.style.visibility = 'hidden';
    return;
  }
  let visibility = 'hidden';
  const value = data.values[g.epName].value;
  for (let i = 0; i < g.displayThresholds.length; i += 1) {
    const stateColor = g.displayThresholds[i].split('$');
    if (stateColor[0] === '=' && value === stateColor[1]) {
      visibility = stateColor[2];
    } else if (stateColor[0] === '!=' && value !== stateColor[1]) {
      visibility = stateColor[2];
    } else if (stateColor[0] === '>' && value > stateColor[1]) {
      visibility = stateColor[2];
    } else if (stateColor[0] === '>=' && value >= stateColor[1]) {
      visibility = stateColor[2];
    } else if (stateColor[0] === '<' && value < stateColor[1]) {
      visibility = stateColor[2];
    } else if (stateColor[0] === '<=' && value <= stateColor[1]) {
      visibility = stateColor[2];
    }
  }

  for (let i = 0; i < g.displayRegex.length; i += 1) {
    const stateColor = g.displayRegex[i].split('=');
    const regex = RegExp(stateColor[0]);
    if (value.match(regex)) {
      visibility = stateColor[1];
    }
  }
  el.style.visibility = visibility === 'show' ? 'visible' : 'hidden';
};
