import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import styles from './VirtualizedTableView.css';

const ResizerTool = ({ colKey, height, onDrag }) =>
  <Draggable
    axis="x"
    defaultClassName="DragHandle"
    defaultClassNameDragging="DragHandleActive"
    onDrag={(event, { deltaX }) => {
      onDrag(colKey, deltaX);
    }}
    position={{ x: 0 }}
    zIndex={999}
  >
    <div
      className={styles.DragHandleIcon}
      style={{ height }}
    >{}</div>
  </Draggable>;

ResizerTool.propTypes = {
  colKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
};

export default ResizerTool;
