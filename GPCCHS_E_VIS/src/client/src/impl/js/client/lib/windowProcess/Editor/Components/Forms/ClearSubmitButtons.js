import React, { PropTypes, PureComponent } from 'react';
import {
  ButtonGroup,
  Button
} from 'react-bootstrap';
import classnames from 'classnames';

import styles from './ClearSubmitButtons.css';

export default class ClearSubmitButtons extends PureComponent {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func
  }

  render() {
    const {
      pristine,
      submitting,
      reset,
      valid
    } = this.props;

    return (
      <div className={classnames('ClearSubmitButtons', styles.root)}>
        <ButtonGroup>
          {reset && <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </Button>}
          <Button
            bsStyle="success"
            type="submit"
            disabled={pristine || submitting || !valid}
          >
            Submit
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
