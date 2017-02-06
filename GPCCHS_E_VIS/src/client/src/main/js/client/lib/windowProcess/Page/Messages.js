import React, { PureComponent, PropTypes } from 'react';

import Message from '../common/Message';

export default class Messages extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    messages: PropTypes.array,
    remove: PropTypes.func.isRequired,
  };

  render() {
    const {
      pageId,
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
            onClose={() => remove(pageId, i)}
            containerId={pageId}
          />
        )}
      </div>
    );
  }
}
