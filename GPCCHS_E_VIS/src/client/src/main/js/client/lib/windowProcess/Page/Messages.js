import React, { PropTypes } from 'react';
import Message from '../common/Message';

const Messages = (props) => {
  const { containerId, messages, removeMessage, cancelRemoveMessage } = props;
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
};
Messages.propTypes = {
  containerId: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  removeMessage: PropTypes.func.isRequired,
  cancelRemoveMessage: PropTypes.func.isRequired,
};
Messages.defaultProps = {
  messages: [],
};

export default Messages;
