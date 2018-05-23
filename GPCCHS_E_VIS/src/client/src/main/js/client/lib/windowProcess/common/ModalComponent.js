import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';

const ModalComponent = props => (
  <div className="modal-container">
    <Modal show={props.isOpened} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
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
        { props.children }
      </Modal.Body>
    </Modal>
  </div>
);
ModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
ModalComponent.defaultProps = {
  isOpened: false,
  children: null,
};

export default ModalComponent;
