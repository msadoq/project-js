// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Timebar : VisuWindow and SlideWindow as function components.
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Added theme variables linked to main areas.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import classnames from 'classnames';
import React, { PropTypes } from 'react';
import styles from './VisuWindow.css';

function VisuWindow(props) {
  const {
    toggleTimesetter,
    onMouseDown,
    onMouseDownResize,
    onMouseDownNavigate,
    formatDate,
    dragging,
    resizing,
    lowerPercentOffset,
    currentPercentOffset,
    selectedPercentWidth,
    slideLowerPercentOffset,
    slideUpperPercentOffset,
    lower,
    current,
    upper,
    timebarMode,
    widthPx,
    lowerPercent,
    upperPercent,
    currentPercent,
  } = props;

  /*
    Determinate for each cursor if we display a handle to help
    the user
  */
  const lowerCurrentClose = (currentPercent - lowerPercent) * (widthPx * 0.01) < 20;
  const upperCurrentClose = (upperPercent - currentPercent) * (widthPx * 0.01) < 20;
  const slideUpperUpperClose = Math.abs((upperPercent - slideUpperPercentOffset)
    * (widthPx * 0.01)) < 20 && timebarMode !== 'Normal';
  const slideUpperCurrentClose = Math.abs((slideUpperPercentOffset - currentPercent)
    * (widthPx * 0.01)) < 20 && timebarMode !== 'Normal';
  const slideLowerCurrentClose = Math.abs((currentPercent - slideLowerPercentOffset)
    * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';
  const slideLowerLowerClose = Math.abs((slideLowerPercentOffset - lowerPercent)
    * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';
  const moveLower = (currentPercent - lowerPercent) * (widthPx * 0.01) < 40;
  const moveUpper = (upperPercent - currentPercent) * (widthPx * 0.01) < 40;

  return (
    <div
      className={
        classnames(
          styles.visuWindow,
          (dragging ? styles.viewportDragging : null),
          (resizing ? styles.viewportResizing : null)
        )
      }
      style={{
        left: `${lowerPercentOffset}%`,
        width: `${selectedPercentWidth}%`,
      }}
      onMouseDown={onMouseDown}
    >

      { /*
        The 3 main cursors
      */ }
      <span
        cursor="lower"
        className={styles.lower}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />
      <span
        cursor="current"
        className={styles.current}
        style={{ left: `${currentPercentOffset}%` }}
        onMouseDown={onMouseDownNavigate}
        onDoubleClick={toggleTimesetter}
      />
      <span
        cursor="upper"
        className={styles.upper}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        Circle handle for lower cursor
      */ }
      <span
        cursor="lower"
        className={classnames(
          styles.handle,
          styles.handleLower,
          { [styles.undisplayed]: !lowerCurrentClose && !slideLowerLowerClose }
        )}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        Circle handle for current cursor
      */ }
      <span
        cursor="current"
        className={classnames(
          styles.handle,
          styles.handleCurrent,
          { [styles.undisplayed]: !lowerCurrentClose && !upperCurrentClose &&
            !slideUpperCurrentClose && !slideLowerCurrentClose }
        )}
        style={{ left: `${currentPercentOffset}%` }}
        onMouseDown={onMouseDownNavigate}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        Circle handle for upper cursor
      */ }
      <span
        cursor="upper"
        className={classnames(
          styles.handle,
          styles.handleUpper,
          { [styles.undisplayed]: !upperCurrentClose && !slideUpperUpperClose }
        )}
        onMouseDown={onMouseDownResize}
        onDoubleClick={toggleTimesetter}
      />

      { /*
        The 3 main cursors's formatted dates
      */ }
      <span
        className={classnames(
          'LowerFormattedTime',
          styles.lowerFormattedTime,
          {
            [styles.moved]: moveLower,
            hidden: lower === current,
          }
        )}
      >
        {formatDate(lower, true)}
      </span>
      <span
        className={classnames('CurrentFormattedTime', styles.currentFormattedTime)}
        style={{ left: `${currentPercentOffset}%` }}
      >
        {formatDate(current, true)}
      </span>
      <span
        className={classnames(
          'UpperFormattedTime',
          styles.upperFormattedTime,
          {
            [styles.moved]: moveUpper,
            hidden: upper === current,
          }
        )}
      >
        {formatDate(upper, true)}
      </span>
    </div>
  );
}

VisuWindow.propTypes = {
  timebarMode: PropTypes.string.isRequired,
  toggleTimesetter: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseDownResize: PropTypes.func.isRequired,
  onMouseDownNavigate: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  resizing: PropTypes.bool.isRequired,
  currentPercentOffset: PropTypes.number.isRequired,
  lowerPercentOffset: PropTypes.number.isRequired,
  selectedPercentWidth: PropTypes.number.isRequired,
  slideLowerPercentOffset: PropTypes.number.isRequired,
  slideUpperPercentOffset: PropTypes.number.isRequired,
  lower: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  upper: PropTypes.number.isRequired,
  widthPx: PropTypes.number.isRequired,
  lowerPercent: PropTypes.number.isRequired,
  upperPercent: PropTypes.number.isRequired,
  currentPercent: PropTypes.number.isRequired,
};

export default VisuWindow;
