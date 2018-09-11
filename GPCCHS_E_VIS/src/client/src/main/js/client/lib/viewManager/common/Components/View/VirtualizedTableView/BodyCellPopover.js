import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Overlay, Popover } from 'react-bootstrap';


const BodyCellPopover =
  ({
     parent,
     hoveredCell,
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

    const overlayPlacement = (columnIndex === numberOfColumns - 1) ? 'left' : 'right';

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
  numberOfColumns: PropTypes.number.isRequired,
};

BodyCellPopover.defaultProps = {
  hoveredCell: null,
};

export default BodyCellPopover;
