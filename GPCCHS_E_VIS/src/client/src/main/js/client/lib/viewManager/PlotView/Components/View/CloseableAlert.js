import React, { PropTypes, Component } from 'react';
import {
  Alert as BSAlert,
  Button,
} from 'react-bootstrap';

const dangerBtnStyle = { float: 'right' };

const changeVisibility = visible => () => ({
  visible,
});

export default class CloseableAlert extends Component {
  static propTypes = {
    bsStyle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    style: PropTypes.shape({}),
  }

  static defaultProps = {
    style: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  onClick = f => () => this.setState(f);

  render() {
    const {
      bsStyle,
      style,
      className,
      children,
    } = this.props;
    const {
      visible,
    } = this.state;

    return (
      <div
        style={{
          ...style,
          overflow: 'auto',
        }}
        className={className}
      >
        {visible ? <BSAlert
          bsStyle={bsStyle}
          onDismiss={this.onClick(changeVisibility(false))}
        >
          {children}
        </BSAlert> :
        <Button
          bsStyle="danger"
          onClick={this.onClick(changeVisibility(true))}
          style={dangerBtnStyle}
        >
          errors
        </Button>}
      </div>
    );
  }
}
