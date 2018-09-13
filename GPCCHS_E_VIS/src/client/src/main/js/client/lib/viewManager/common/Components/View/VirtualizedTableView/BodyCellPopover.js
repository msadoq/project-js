import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Overlay, Popover } from 'react-bootstrap';


const BodyCellPopover =
  ({
     parent,
     hoveredCell,
     columnStopIndex,
     numberOfColumns,
   }) => {
    if (!hoveredCell) {
      return null;
    }

    const { content, columnIndex } = hoveredCell;

    const popoverContent = _.get(['tooltip', 'body'], content);

    const popover = (
      <Popover
        id="cell-popover"
        title={_.get(['tooltip', 'title'], content)}
      >
        {popoverContent}
      </Popover>
    );

    const _isLastDisplayedColumn = () =>
      columnIndex === columnStopIndex - 1 ||
      columnIndex === numberOfColumns - 1;


    const overlayPlacement = _isLastDisplayedColumn() ? 'left' : 'right';

    return popoverContent ?
      (
        <Overlay
          show
          container={parent}
          placement={overlayPlacement}
          target={_.get('target', hoveredCell)}
        >
          {popover}
        </Overlay>
      ) : null;
  };

BodyCellPopover.propTypes = {
  parent: PropTypes.shape().isRequired,
  hoveredCell: PropTypes.shape(),
  columnStopIndex: PropTypes.number,
  numberOfColumns: PropTypes.number,
};

BodyCellPopover.defaultProps = {
  hoveredCell: null,
  columnStopIndex: 0,
  numberOfColumns: 0,
};

export default BodyCellPopover;
