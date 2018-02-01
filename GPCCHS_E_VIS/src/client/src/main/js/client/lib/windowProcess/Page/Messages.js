// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint Page Messages in windowProcess folder
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : remove isRequired react errors in Message component
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// END-HISTORY
// ====================================================================

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
