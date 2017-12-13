// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Timebar : VisuWindow and SlideWindow as function components.
// END-HISTORY
// ====================================================================

import classnames from 'classnames';
import React, { PropTypes } from 'react';
import styles from './SlideWindow.css';

function SlideWindow(props) {
  const {
    toggleTimesetter,
    lowerPercent,
    upperPercent,
    currentPercent,
    slideLowerPercentOffset,
    slideUpperPercentOffset,
    timebarMode,
    widthPx,
    onMouseDownResize,
  } = props;

  /*
    Determinate for each cursor if we display a handle to help
    the user
  */
  const slideUpperUpperClose = Math.abs((upperPercent - slideUpperPercentOffset)
    * (widthPx * 0.01)) < 20;
  const slideUpperCurrentClose = Math.abs((slideUpperPercentOffset - currentPercent)
    * (widthPx * 0.01)) < 20;
  const slideLowerCurrentClose = Math.abs((currentPercent - slideLowerPercentOffset)
    * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';
  const slideLowerLowerClose = Math.abs((slideLowerPercentOffset - lowerPercent)
    * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';

  return (
    <div
      className={styles.slideWindow}
    >
      <span
        cursor="slideLower"
        title="Ext lower cursor"
        style={{
          left: `${slideLowerPercentOffset}%`,
        }}
        className={classnames(styles.slide, { hidden: timebarMode === 'Extensible' })}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />
      <span
        cursor="slideUpper"
        title="Ext upper cursor"
        style={{
          left: `${slideUpperPercentOffset}%`,
        }}
        className={styles.slide}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        Circle handle for slideLower cursor
      */ }
      <span
        cursor="slideLower"
        className={classnames(
          styles.handle,
          styles.handleSlideLower,
          { [styles.undisplayed]: !slideLowerLowerClose && !slideLowerCurrentClose }
        )}
        style={{
          left: `${slideLowerPercentOffset}%`,
        }}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        Circle handle for slideUpper cursor
      */ }
      <span
        cursor="slideUpper"
        className={classnames(
          styles.handle,
          styles.handleSlideUpper,
          { [styles.undisplayed]: !slideUpperUpperClose && !slideUpperCurrentClose }
        )}
        style={{
          left: `${slideUpperPercentOffset}%`,
        }}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />
    </div>
  );
}

SlideWindow.propTypes = {
  timebarMode: PropTypes.string.isRequired,
  toggleTimesetter: PropTypes.func.isRequired,
  slideLowerPercentOffset: PropTypes.number.isRequired,
  slideUpperPercentOffset: PropTypes.number.isRequired,
  widthPx: PropTypes.number.isRequired,
  onMouseDownResize: PropTypes.func.isRequired,
  lowerPercent: PropTypes.number.isRequired,
  upperPercent: PropTypes.number.isRequired,
  currentPercent: PropTypes.number.isRequired,
};

export default SlideWindow;
