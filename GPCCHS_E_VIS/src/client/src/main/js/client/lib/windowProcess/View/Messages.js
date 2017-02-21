import React, { PureComponent, PropTypes } from 'react';

import Message from '../common/Message';

export default class Messages extends PureComponent {
  static propTypes = {
    containerId: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    remove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    messages: [],
  }

  render() {
    const {
      containerId,
      messages,
      remove,
    } = this.props;

    return (
      <div>
        {messages && messages.map((v, i) =>
          <Message
            key={v.message}
            type={v.type}
            message={v.message}
            onClose={() => remove(containerId, i)}
            containerId={containerId}
          />
        )}
      </div>
    );
  }
}
