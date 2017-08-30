export const setAttributeIfChanged = (element, attributeName, newValue, type) => {
  const value = element.getAttribute(attributeName);
  if (type === 'number') {
    if (parseFloat(value) !== newValue) {
      element.setAttribute(attributeName, newValue);
    }
  } else if (value !== newValue) {
    // console.log('value changed', value, newValue);
    element.setAttribute(attributeName, newValue);
  }
};

export const setStyleIfChanged = (element, attributeName, newValue, type) => {
  const el = element;
  const value = element.style[attributeName];
  if (type === 'number') {
    if (parseFloat(value) !== newValue) {
      el.style[attributeName] = newValue;
    }
  } else if (value !== newValue) {
    // console.log('style changed', attributeName, value, ', ', newValue);
    el.style[attributeName] = newValue;
  }
};

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
      setStyleIfChanged(el, 'visibility', 'hidden', 'string');
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let ratio = (value - g.domain[0]) / (g.domain[1] - g.domain[0]);
  ratio = ratio < 0 ? 0 : ratio;
  ratio = Math.round(ratio * 1000) / 1000;
  if (g.type === 'scaleY') {
    setStyleIfChanged(el, 'transform', `scaleY(${ratio})`, 'string');
  } else {
    setStyleIfChanged(el, 'transform', `scaleX(${ratio})`, 'string');
  }
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
  setStyleIfChanged(el, 'transformOrigin', g.fixed ? `${g.fixed} center 0px` : 'center bottom 0px', 'string');
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
      setStyleIfChanged(el, 'visibility', 'hidden', 'string');
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let distance = ((value - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.width;
  distance = distance < 0 ? 0 : distance;
  distance = distance > g.width ? g.width : distance;
  distance = Math.round(distance * 1000) / 1000;
  if (g.type === 'translateY') {
    if (g.direction === 'top') {
      distance *= -1;
    }
    setStyleIfChanged(el, 'transform', `translate(0px, ${distance}px)`, 'string');
  } else {
    if (g.direction === 'left') {
      distance *= -1;
    }
    setStyleIfChanged(el, 'visibility', 'visible', 'string');
    setStyleIfChanged(el, 'transform', `translate(${distance}px, 0px)`, 'string');
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
      setStyleIfChanged(el, 'visibility', 'hidden', 'string');
      return;
    }
  } else {
    value = data.values[g.epName].value;
  }
  let angle = ((value - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.angle;
  angle = angle < 0 ? 0 : angle;
  angle = angle > g.angle ? g.angle : angle;
  angle = Math.round(angle * 1000) / 1000;
  setStyleIfChanged(el, 'transformOrigin', `${g.center[0]}px ${g.center[1]}px 0px`, 'string');
  setStyleIfChanged(el, 'transform', `rotate(${angle}deg)`, 'string');
};

export const textBoxAnimation = (data, g) => {
  const el = g.el;
  const elBg = g.elBg;
  if (!el || !elBg) {
    return;
  }
  const SVGRect = el.getBBox();

  setAttributeIfChanged(elBg, 'width', SVGRect.width, 'number');
  setAttributeIfChanged(elBg, 'height', SVGRect.height, 'number');
  setAttributeIfChanged(elBg, 'y', SVGRect.y, 'number');

  if (!data.values[g.epName] || !data.values[g.epName].value) {
    if (g.defaultValue) {
      setStyleIfChanged(el, 'fill', g.defaultValue[0], 'string');
      setStyleIfChanged(elBg, 'fill', g.defaultValue[1], 'string');
      setStyleIfChanged(el, 'visibility', 'visible', 'string');
      el.innerHTML = g.defaultValue[2];
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
  setStyleIfChanged(el, 'fill', fillText, 'string');
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
  for (let i = 0; i < g.bgColorLevels.length; i += 1) {
    const stateColor = g.bgColorLevels[i].split('$');
    if (value > stateColor[0]) {
      fillBg = stateColor[1];
    }
  }
  setStyleIfChanged(elBg, 'fill', fillBg, 'string');
  setStyleIfChanged(elBg, 'fillOpacity', fillBg === '' ? 0 : 1, 'number');
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
      setStyleIfChanged(el, 'visibility', 'hidden', 'string');
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
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
  const nodes = el.childNodes;
  if (color) {
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].style) {
        setStyleIfChanged(nodes[i], 'fill', color, 'string');
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
    setStyleIfChanged(el, 'visibility', 'hidden', 'string');
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
  setStyleIfChanged(el, 'visibility', visibility === 'show' ? 'visible' : 'hidden', 'string');
};
