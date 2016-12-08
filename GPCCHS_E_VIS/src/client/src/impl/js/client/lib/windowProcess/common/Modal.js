import React, { Component, PropTypes, cloneElement } from 'react';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';

export default class ModalComponent extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  state = {
    showModal: true,
  }

  onClose = () => {
    // hide timeline (animation) and then call the onClose
    this.setState({ showModal: false });
    setTimeout(() => this.props.onClose(), 300);
  }

  render() {
    return (
      <div className="modal-container">
        <Modal show={this.state.showModal} onHide={this.onClose}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
            <button
              className={classnames(
                'btn-sm',
                'btn',
                'btn-danger',
                'btn-close'
              )}
              onClick={this.onClose}
            >x</button>
          </Modal.Header>
          <Modal.Body>
            { cloneElement(this.props.children, { onClose: this.onClose }) }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
