export const scaleAnimation = (data, g) => {
  if (!data.values[g.epName]) {
    return;
  }
  const epLastVal = data.values[g.epName].value;
  let ratio = (epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0]);
  ratio = ratio < 0 ? 0 : ratio;
  const el = g.el;
  if (!el) {
    return;
  }
  if (g.type === 'scaleY') {
    el.style.transform = `scaleY(${ratio})`;
  } else {
    el.style.transform = `scaleX(${ratio})`;
  }
  el.style.transformOrigin = g.fixed || 'bottom';
};

export const translateAnimation = (data, g) => {
  if (!data.values[g.epName]) {
    return;
  }
  const epLastVal = data.values[g.epName].value;
  let distance = ((epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.width;
  distance = distance < 0 ? 0 : distance;
  distance = distance > g.width ? g.width : distance;
  const el = g.el;
  if (!el) {
    return;
  }
  if (g.type === 'translateY') {
    if (g.direction === 'top') {
      distance *= -1;
    }
    el.style.transform = `translate(0px, ${distance}px)`;
  } else {
    if (g.direction === 'left') {
      distance *= -1;
    }
    el.style.transform = `translate(${distance}px, 0px)`;
  }
};

export const rotateAnimation = (data, g) => {
  if (!data.values[g.epName]) {
    return;
  }
  const epLastVal = data.values[g.epName].value;
  let angle = ((epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.angle;
  angle = angle < 0 ? 0 : angle;
  angle = angle > g.angle ? g.angle : angle;
  const el = g.el;
  if (!el) {
    return;
  }
  el.style.transformOrigin = `${g.center[0]}px ${g.center[1]}px`;
  el.style.transform = `rotate(${angle}deg)`;
};

export const textBoxAnimation = (data, g) => {
  if (!data.values[g.epName]) {
    return;
  }
  const epLastVal = data.values[g.epName].value;
  const el = g.el;
  const elBg = g.elBg;
  if (el) {
    const SVGRect = el.getBBox();
    elBg.setAttribute('width', SVGRect.width);
    elBg.setAttribute('height', SVGRect.height);
    elBg.setAttribute('y', SVGRect.y);
    el.innerHTML = isNaN(epLastVal) ? epLastVal : Math.round(epLastVal * 100) / 100;
    let fillText = '#000';
    let fillBg = '';
    for (let i = 0; i < g.textColorThresholds.length; i += 1) {
      const stateColor = g.textColorThresholds[i].split('|');
      if (epLastVal > stateColor[0]) {
        fillText = stateColor[1];
      }
    }
    for (let i = 0; i < g.textColorRegex.length; i += 1) {
      const stateColor = g.textColorRegex[i].split('=');
      const regex = RegExp(stateColor[0]);
      if (epLastVal.match(regex)) {
        fillText = stateColor[1];
      }
    }
    el.style.fill = fillText;
    for (let i = 0; i < g.bgColorLevels.length; i += 1) {
      const stateColor = g.bgColorLevels[i].split('$');
      if (epLastVal > stateColor[0]) {
        fillBg = stateColor[1];
      }
    }
    elBg.style.fill = fillBg;
    elBg.style.fillOpacity = fillBg === '' ? 0 : 1;
  }
};

export const colourAnimation = (data, g) => {
  if (!data.values[g.epName]) {
    return;
  }
  const epLastVal = data.values[g.epName].value;
  const el = g.el;
  if (!el) {
    return;
  }
  let color;
  for (let i = 0; i < g.operators.length; i += 1) {
    const stateColor = g.operators[i].split('$');
    if (stateColor[0] === '=' && epLastVal === stateColor[1]) {
      color = stateColor[2];
    } else if (stateColor[0] === '!=' && epLastVal !== stateColor[1]) {
      color = stateColor[2];
    } else if (stateColor[0] === '>' && epLastVal > stateColor[1]) {
      color = stateColor[2];
    } else if (stateColor[0] === '>=' && epLastVal >= stateColor[1]) {
      color = stateColor[2];
    } else if (stateColor[0] === '<' && epLastVal < stateColor[1]) {
      color = stateColor[2];
    } else if (stateColor[0] === '<=' && epLastVal <= stateColor[1]) {
      color = stateColor[2];
    }
  }
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
  if (!data.values[g.epName]) {
    return;
  }
  const el = g.el;
  const epLastVal = data.values[g.epName].value;
  if (el) {
    let visibility = 'hidden';
    for (let i = 0; i < g.displayThresholds.length; i += 1) {
      const stateColor = g.displayThresholds[i].split('$');
      if (stateColor[0] === '=' && epLastVal === stateColor[1]) {
        visibility = stateColor[2];
      } else if (stateColor[0] === '!=' && epLastVal !== stateColor[1]) {
        visibility = stateColor[2];
      } else if (stateColor[0] === '>' && epLastVal > stateColor[1]) {
        visibility = stateColor[2];
      } else if (stateColor[0] === '>=' && epLastVal >= stateColor[1]) {
        visibility = stateColor[2];
      } else if (stateColor[0] === '<' && epLastVal < stateColor[1]) {
        visibility = stateColor[2];
      } else if (stateColor[0] === '<=' && epLastVal <= stateColor[1]) {
        visibility = stateColor[2];
      }
    }
    for (let i = 0; i < g.displayRegex.length; i += 1) {
      const stateColor = g.displayRegex[i].split('=');
      const regex = RegExp(stateColor[0]);
      if (epLastVal.match(regex)) {
        visibility = stateColor[1];
      }
    }
    el.style.visibility = visibility === 'show' ? 'visible' : 'hidden';
  }
};
