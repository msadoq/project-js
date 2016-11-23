
export default function compute(current, lower, upper, slideLower, slideUpper,
  mode, currentUpperMargin) {
  /*
    Current can not equal upper
    there is a mandatory margin between the two cursors
  */
  const msWidth = upper - lower;
  const mandatoryMarginMs = currentUpperMargin * msWidth;

  let offsetMs = 0;
  if (mode === 'Normal' || mode === 'Extensible') {
    if (current + mandatoryMarginMs > upper) {
      offsetMs = (current + mandatoryMarginMs) - upper;
    }
  } else if (mode === 'Fixed') {
    if (current > slideUpper) {
      offsetMs = current - slideUpper;
    }
  }

  const newLower = lower + offsetMs;
  const newUpper = upper + offsetMs;

  /*
  * @return { lower, upper, slideLower, slideUpper }
  */

  const r = {
    visuWindow: {},
    slideWindow: {},
  };
  switch (mode) {
    case 'Normal':
      r.visuWindow.lower = newLower;
      r.visuWindow.upper = newUpper;
      r.slideWindow.lower = slideLower + offsetMs; // not used - invisible
      r.slideWindow.upper = slideUpper + offsetMs; // not used - invisible
      break;
    case 'Extensible':
      if (newUpper > slideUpper) {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower + offsetMs; // not used - invisible
        r.slideWindow.upper = newUpper;
      } else {
        r.visuWindow.lower = lower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower + offsetMs; // not used - invisible
        r.slideWindow.upper = slideUpper;
      }
      break;
    case 'Fixed':
      if (newUpper > slideUpper) {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower + offsetMs;
        r.slideWindow.upper = slideUpper + offsetMs;
      } else {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower;
        r.slideWindow.upper = slideUpper;
      }
      break;
    default:
      r.visuWindow.lower = newLower;
      r.visuWindow.upper = newUpper;
      r.slideWindow.lower = slideLower;
      r.slideWindow.upper = slideUpper;
      break;
  }

  return r;
}
