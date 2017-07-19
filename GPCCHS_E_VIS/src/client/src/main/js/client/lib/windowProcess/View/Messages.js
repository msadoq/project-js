import React, { PureComponent, PropTypes } from 'react';

import Message from '../common/Message';

export default class Messages extends PureComponent {
  static propTypes = {
    containerId: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    removeMessage: PropTypes.func.isRequired,
    cancelRemoveMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    messages: [],
  }

  render() {
    const {
      containerId,
      messages,
      removeMessage,
      cancelRemoveMessage,
    } = this.props;
    return (
      <div>
        {messages && messages.map((v, i) => {
          const key = `${i}_${v.message}`;
          return (
            <Message
              key={key}
              type={v.type}
              message={v.message}
              removing={v.removing}
              onClose={() => removeMessage(containerId, v.uuid)}
              onHover={() => cancelRemoveMessage(containerId, v.uuid)}
            />
          );
        }
        )}
      </div>
    );
  }
}
