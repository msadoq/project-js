import React, { PropTypes, PureComponent } from 'react';
import { Button } from 'react-bootstrap';

export default class DialogModal extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }).isRequired),
    closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    message: '',
    buttons: [],
  }

  render() {
    const { message, buttons, closeModal } = this.props;
    return (
      <div>
        <h4>{message}</h4>
        <p />
        <div className="text-center">
          {
            buttons.map(({ label, value, type = 'primary' }) => (
              <Button
                className="mr10"
                key={label + value}
                bsStyle={type}
                onClick={() => closeModal(value)}
              >
                {label}
              </Button>
            ))
          }
        </div>
      </div>
    );
  }
}
