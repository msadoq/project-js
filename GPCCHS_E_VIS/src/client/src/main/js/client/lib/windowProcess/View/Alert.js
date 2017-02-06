import React, { PropTypes } from 'react';
import {
  Alert as BSAlert,
  Button,
} from 'react-bootstrap';
import { withState, withProps } from 'recompose';

const dangerBtnStyle = { float: 'right' };

const Alert = ({
  bsStyle,
  children,
  className,
  visible = true,
  style,
  setVisible,
}) => (
  <div
    style={{
      ...style,
      overflow: 'auto',
    }}
    className={className}
  >
    {visible ? <BSAlert
      bsStyle={bsStyle}
      onDismiss={setVisible && (() => setVisible(false))}
    >
      {children}
    </BSAlert> :
    <Button
      bsStyle="danger"
      onClick={() => setVisible(true)}
      style={dangerBtnStyle}
    >
      errors
    </Button>}
  </div>
);

Alert.propTypes = {
  bsStyle: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

const CloseableAlert = withState('visible', 'setVisible', true)(Alert);

export default {
  Alert,
  CloseableAlert,
  Danger: withProps({
    bsStyle: 'danger',
  })(CloseableAlert),
};
