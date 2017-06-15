import React, { PropTypes } from 'react';
import Message from '../common/Message';

const Messages = (props) => {
  const { containerId, messages, remove } = props;
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
            onClose={() => remove(containerId, i)}
            containerId={containerId}
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
  remove: PropTypes.func.isRequired,
};
Messages.defaultProps = {
  messages: [],
};

export default Messages;
