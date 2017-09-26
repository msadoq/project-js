// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and Reload buttons beneath the title.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import classnames from 'classnames';

import styles from './ClearSubmitButtons.css';

const ClearSubmitButtons = (props) => {
  const {
    pristine,
    submitting,
    reset,
    valid,
    asyncValidating = false,
  } = props;

  return (
    <div className={classnames('ClearSubmitButtons', styles.root)}>
      <ButtonGroup>
        {reset && <Button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
          className="mr5"
        >
          Clear
        </Button>}
        <Button
          bsStyle="success"
          type="submit"
          disabled={asyncValidating || pristine || submitting || !valid}
        >
          Submit
        </Button>
      </ButtonGroup>
    </div>
  );
};

ClearSubmitButtons.propTypes = {
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  asyncValidating: PropTypes.bool,
  reset: PropTypes.func,
};

ClearSubmitButtons.defaultProps = {
  asyncValidating: false,
  reset: null,
};

export default ClearSubmitButtons;
