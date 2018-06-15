// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 25/08/2017 : Put MimicView animation methods appart, and test
//  each one of them (rotate, scale...).
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : MimicView : adapted tests to handle dom element
//  mocking, setAttribute and getAttribute mocked functions.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : Added default values to all MimicView's animations.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : imicView Fixed rotate animation error, set
//  visibility to visible.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : Every MimicView attribute update or style update is
//  performed only if it is necessary (if value changed)
// VERSION : 1.1.2 : DM : #6816 : 31/08/2017 : MimicView : rotate property can go under 0, ex:
//  -25,25. For rotate, translate and scale, isis_origin must be provided or is set to left top.
// VERSION : 1.1.2 : DM : #6816 : 01/09/2017 : MimicView : renamed some attributes, no origin
//  attribute for translate animation, scale can go between x and x angles.
// VERSION : 1.1.2 : DM : #6816 : 06/09/2017 : Test perfs on mimic, add new demo mimic
// VERSION : 1.1.2 : DM : #6816 : 07/09/2017 : add plotviews with differents EP
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// END-HISTORY
// ====================================================================

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

const setStyleIfChanged = (element, attributeName, newValue, type) => {
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
  const val = (value - g.domain[0]) / (g.domain[1] - g.domain[0]);
  let scale = g.scale[0] + (val * (g.scale[1] - g.scale[0]));
  if (scale > g.scale[1]) {
    scale = g.scale[1];
  } else if (scale < g.scale[0]) {
    scale = g.scale[0];
  }
  scale /= 100; // Because g.scale are expressed in percent
  scale = Math.round(scale * 1000) / 1000;
  if (g.type === 'scaleY') {
    setStyleIfChanged(el, 'transform', `scaleY(${scale})`, 'string');
  } else {
    setStyleIfChanged(el, 'transform', `scaleX(${scale})`, 'string');
  }
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
  setStyleIfChanged(el, 'transformOrigin', g.origin ? `${g.origin} 0px` : 'left top 0px', 'string');
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
  let distance = ((value - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.distance;
  distance = distance < 0 ? 0 : distance;
  distance = distance > g.distance ? g.distance : distance;
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
    setStyleIfChanged(el, 'transform', `translate(${distance}px, 0px)`, 'string');
    setStyleIfChanged(el, 'visibility', 'visible', 'string');
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
  const val = (value - g.domain[0]) / (g.domain[1] - g.domain[0]);
  let angle = g.angle[0] + ((g.angle[1] - g.angle[0]) * val);
  angle = (angle > g.angle[1] || angle < g.angle[0]) ? g.angle[0] : angle;
  angle = Math.round(angle * 1000) / 1000;
  setStyleIfChanged(el, 'transform', `rotate(${angle}deg)`, 'string');
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
  setStyleIfChanged(el, 'transformOrigin', g.origin ? `${g.origin} 0px` : 'left top 0px', 'string');
};

export const skewAnimation = (data, g) => {
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
  const val = (value - g.domain[0]) / (g.domain[1] - g.domain[0]);
  let angle = g.angle[0] + ((g.angle[1] - g.angle[0]) * val);
  angle = (angle > g.angle[1] || angle < g.angle[0]) ? g.angle[0] : angle;
  angle = Math.round(angle * 1000) / 1000;
  if (g.type === 'skewX') {
    setStyleIfChanged(el, 'transform', `skewX(${angle}deg)`, 'string');
  } else {
    setStyleIfChanged(el, 'transform', `skewY(${angle}deg)`, 'string');
  }
  setStyleIfChanged(el, 'visibility', 'visible', 'string');
};

// eslint-disable-next-line complexity, "DV6 TBC_CNES Unavoidable complexity"
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
  for (let i = 0; i < g.textColorOperators.length; i += 1) {
    const stateColor = g.textColorOperators[i].split('|');
    if (stateColor[0] === '=' && value === stateColor[1]) {
      fillText = stateColor[2];
    } else if (stateColor[0] === '!=' && value !== stateColor[1]) {
      fillText = stateColor[2];
    } else if (stateColor[0] === '>' && value > stateColor[1]) {
      fillText = stateColor[2];
    } else if (stateColor[0] === '>=' && value >= stateColor[1]) {
      fillText = stateColor[2];
    } else if (stateColor[0] === '<' && value < stateColor[1]) {
      fillText = stateColor[2];
    } else if (stateColor[0] === '<=' && value <= stateColor[1]) {
      fillText = stateColor[2];
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
  for (let i = 0; i < g.bgColorOperators.length; i += 1) {
    const stateColor = g.bgColorOperators[i].split('|');
    if (stateColor[0] === '=' && value === stateColor[1]) {
      fillBg = stateColor[2];
    } else if (stateColor[0] === '!=' && value !== stateColor[1]) {
      fillBg = stateColor[2];
    } else if (stateColor[0] === '>' && value > stateColor[1]) {
      fillBg = stateColor[2];
    } else if (stateColor[0] === '>=' && value >= stateColor[1]) {
      fillBg = stateColor[2];
    } else if (stateColor[0] === '<' && value < stateColor[1]) {
      fillBg = stateColor[2];
    } else if (stateColor[0] === '<=' && value <= stateColor[1]) {
      fillBg = stateColor[2];
    }
  }
  for (let i = 0; i < g.bgColorRegex.length; i += 1) {
    const stateColor = g.colorRegex[i].split('=');
    const regex = RegExp(stateColor[0]);
    if (value.match(regex)) {
      fillBg = stateColor[1];
    }
  }
  setStyleIfChanged(elBg, 'fill', fillBg, 'string');
  setStyleIfChanged(elBg, 'fillOpacity', fillBg === '' ? 0 : 1, 'number');

  setStyleIfChanged(el, 'visibility', 'visible', 'string');
};

// eslint-disable-next-line complexity, "DV6 TBC_CNES Unavoidable complexity"
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
    for (let i = 0; i < g.colorOperators.length; i += 1) {
      const stateColor = g.colorOperators[i].split('|');
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
    for (let i = 0; i < g.colorRegex.length; i += 1) {
      const stateColor = g.colorRegex[i].split('=');
      const regex = RegExp(stateColor[0]);
      if (value.match(regex)) {
        color = stateColor[1];
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
  for (let i = 0; i < g.displayOperators.length; i += 1) {
    const stateColor = g.displayOperators[i].split('|');
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
