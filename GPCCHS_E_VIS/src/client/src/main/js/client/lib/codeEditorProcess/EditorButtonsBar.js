import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import styles from './Source.css';

export default class EditorButtonsBar extends React.PureComponent {
  static propTypes = {
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
    reset: PropTypes.func.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pristine: false,
    submitting: false,
    valid: false,
  };

  resetAndClose = () => {
    const { pristine, reset, closeCodeEditor } = this.props;
    if (!pristine) {
      reset();
    }
    closeCodeEditor();
  };

  saveAndClose = () => {
    this.props.handleSubmit();
    this.props.closeCodeEditor();
  };

  render() {
    const { pristine, submitting, valid, reset } = this.props;
    return (
      <div className={styles.footer}>
        <ButtonGroup>
          <Button
            type="button"
            onClick={this.resetAndClose}
            className={styles.footerButton}
          >
            Cancel
          </Button>
          <Button
            bsStyle="warning"
            type="button"
            onClick={reset}
            className={styles.footerButton}
          >
            Reset
          </Button>
          <Button
            bsStyle="success"
            type="submit"
            disabled={pristine || submitting || !valid}
            className={styles.footerButton}
          >
            Submit
          </Button>
          <Button
            bsStyle="success"
            type="submit"
            disabled={pristine || submitting || !valid}
            className={styles.footerButton}
            onClick={this.saveAndClose}
          >
            Submit & Close
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
