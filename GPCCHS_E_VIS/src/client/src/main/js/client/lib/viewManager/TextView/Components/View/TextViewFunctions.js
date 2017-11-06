/**
 * Updates a single Span value, title or color
 * @param val
 * @param id
 * @param sv
 * @param ep
 */
export function updateSpanValue(val = {}, id, sv, ep) {
  if (!ep) {
    return;
  }

  const v = val.value === undefined ? '' : val.value;
  const color = (ep.error ? '#FF0000' : val.color || '#41a62a');
  const shouldUpdateValue = (v !== sv.val);
  const shouldUpdateColor = (color !== sv.color);
  const shouldUpdateTitle = (ep.error && ep.error !== sv.title);
  if (!shouldUpdateValue && !shouldUpdateColor && !shouldUpdateTitle) {
    return;
  }

  // Must mutate sv value, title, el, thus disable es-lint for the whole function
  /* eslint-disable no-param-reassign */
  if (!sv.el) {
    sv.el = document.getElementById(id);
  }

  // update val attribute
  if (shouldUpdateValue) {
    sv.val = v;
    sv.el.innerHTML = ep.error ? 'Invalid entry point' : v;
  }

  // update title attribute
  if (shouldUpdateTitle) {
    sv.title = ep.error;
    sv.el.setAttribute('title', ep.error);
  }

  // update color attribute
  if (shouldUpdateColor) {
    sv.color = color;
    sv.el.style.color = color;
  }
  /* eslint-enable no-param-reassign */
}

/**
 * @param data
 * @param spanValues
 * @param entryPoints
 * @param perfOutput
 */
export default function updateSpanValues(data, spanValues, entryPoints, perfOutput) {
  if (!data.values) {
    return;
  }

  if (perfOutput) {
    // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
    console.time();
  }
  requestAnimationFrame(() => {
    const spanIds = Object.keys(spanValues);
    for (let i = 0; i < spanIds.length; i += 1) {
      const id = spanIds[i];
      const sv = spanValues[id];
      const ep = entryPoints[sv.ep];
      updateSpanValue(data.values[sv.ep], id, sv, ep);
    }
    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.log(
        'Looped on',
        spanIds.length,
        'eps'
      );
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.timeEnd();
    }
  });
}
