import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';

export default class ModalComponent extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpened: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  render() {
    return (
      <div className="modal-container">
        <Modal show={this.props.isOpened} onHide={this.props.onClose}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
            <button
              className={classnames(
                'btn-sm',
                'btn',
                'btn-danger',
                'btn-close'
              )}
              onClick={this.props.onClose}
            >x</button>
          </Modal.Header>
          <Modal.Body>
            { this.props.children }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
