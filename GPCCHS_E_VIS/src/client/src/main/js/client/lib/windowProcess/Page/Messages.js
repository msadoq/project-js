import React, { PropTypes } from 'react';
import Message from '../common/Message';

const Messages = (props) => {
  const { pageId, messages, remove } = props;
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
};
Messages.propTypes = {
  pageId: PropTypes.string.isRequired,
  messages: PropTypes.array,
  remove: PropTypes.func.isRequired,
};
Messages.defaultProps = {
  messages: [],
};

export default Messages;
