
export default function compute(current, lower, upper, slideLower, slideUpper,
  viewportLower, viewportUpper, mode, currentUpperMargin) {
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
    Handling the case where upper cursor is above/near slideWindow.upper
    Moving slideWindow to the right if it's the case
  */
  let newViewportLower = viewportLower;
  let newViewportUpper = viewportUpper;
  if (viewportUpper < newUpper + ((newUpper - newLower) / 5)) {
    newViewportLower = newLower - ((newUpper - newLower) * 2);
    newViewportUpper = newUpper + ((newUpper - newLower) / 5);
  }

  /*
  * @return { lower, upper, slideLower, slideUpper, viewportLower, viewportUpper }
  */

  let toReturn = [];
  switch (mode) {
    case 'Normal':
      toReturn = toReturn.concat([
        newLower,
        newUpper,
        slideLower + offsetMs, // not used - invisible
        slideUpper + offsetMs, // not used - invisible
      ]);
      break;
    case 'Extensible':
      if (newUpper > slideUpper) {
        toReturn = toReturn.concat([
          newLower,
          newUpper,
          slideLower + offsetMs, // not used - invisible
          newUpper,
        ]);
      } else {
        toReturn = toReturn.concat([
          lower,
          newUpper,
          slideLower + offsetMs, // not used - invisible
          slideUpper,
        ]);
      }
      break;
    case 'Fixed':
      if (newUpper > slideUpper) {
        toReturn = toReturn.concat([
          newLower,
          newUpper,
          slideLower + offsetMs,
          slideUpper + offsetMs,
        ]);
      } else {
        toReturn = toReturn.concat([
          newLower,
          newUpper,
          slideLower,
          slideUpper,
        ]);
      }
      break;
    default:
      toReturn = toReturn.concat([
        newLower,
        newUpper,
        slideLower,
        slideUpper,
      ]);
      break;
  }

  toReturn = toReturn.concat([newViewportLower, newViewportUpper]);

  return [...toReturn];
}
