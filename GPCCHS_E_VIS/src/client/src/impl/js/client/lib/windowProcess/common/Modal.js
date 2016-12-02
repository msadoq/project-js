import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';

export default class ModalComponent extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    bodyComponent: PropTypes.func,
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
            <this.props.bodyComponent {...this.props} onClose={this.onClose} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
