import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';
import AddTimelineContainer from '../Timebar/LeftTab/AddTimelineContainer';
import EditTimelineContainer from '../Timebar/LeftTab/EditTimelineContainer';

const ModalGeneric = (props) => {
  let child;
  let title;
  switch (props.props.type) {
    case 'addTimeline':
      title = 'Add timeline';
      child =
        (<AddTimelineContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'editTimeline':
      title = 'Edit timeline';
      child =
        (<EditTimelineContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    default:
      child = (<div />);
      break;
  }

  return (
    <div className="modal-container">
      <Modal show={props.isOpened} onHide={props.onClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <button
            className={classnames(
              'btn-sm',
              'btn',
              'btn-danger',
              'btn-close'
            )}
            onClick={props.onClose}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          {child}
        </Modal.Body>
      </Modal>
    </div>
  );
};

ModalGeneric.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool,
  props: PropTypes.shape().isRequired,
};

ModalGeneric.defaultProps = {
  isOpened: false,
  children: null,
};

export default ModalGeneric;
