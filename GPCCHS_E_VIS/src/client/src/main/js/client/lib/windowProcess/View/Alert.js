import React, { PropTypes } from 'react';
import {
  Alert as BSAlert,
  Button,
} from 'react-bootstrap';
import { withState, withProps } from 'recompose';
import noop from 'lodash/noop';

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
  bsStyle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
Alert.defaultProps = {
  visible: true,
  setVisible: noop,
  style: {},
};

const CloseableAlert = withState('visible', 'setVisible', true)(Alert);

export default {
  Alert,
  CloseableAlert,
  Danger: withProps({
    bsStyle: 'danger',
  })(CloseableAlert),
};
