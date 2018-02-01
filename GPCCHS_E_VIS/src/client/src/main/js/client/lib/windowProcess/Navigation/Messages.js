// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint Navigation/Messages component . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Message component shouldn't display anything if no message
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : remove forbidden attribute choice on div tag.
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Fix messages display, top right corner.
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import Message from '../common/Message';
import styles from './Messages.css';

const types = ['danger', 'warning', 'info', 'success'];

export default class Messages extends PureComponent {
  static propTypes = {
    cancelRemoveMessage: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    messages: [],
  };

  state = {
    filter: 'all',
    collapsed: false,
  }

  updateFilter = (e, type) => {
    e.preventDefault();
    if (this.state.collapsed) {
      this.collapse();
    }
    this.setState({
      filter: type,
    });
  }

  collapse = () => {
    if (!this.state.collapsed && this.state.filter !== 'all') {
      return this.setState({
        filter: 'all',
      });
    }

    this.setState({
      collapsed: !this.state.collapsed,
    });
    return undefined;
  }

  render() {
    const { messages, removeMessage, cancelRemoveMessage } = this.props;
    if (!messages || !messages.length) {
      return null;
    }

    const { collapsed, filter } = this.state;

    const children = [];
    if (!collapsed) {
      messages.forEach((v, i) => {
        if (filter !== 'all' && v.type !== filter) {
          return;
        }
        const key = `${i}_${v.message}`;
        children.push((
          <Message
            key={key}
            type={v.type}
            message={v.message}
            removing={v.removing}
            onClose={() => removeMessage('global', v.uuid)}
            onHover={() => cancelRemoveMessage('global', v.uuid)}
          />
        ));
      });
    }

    // TODO dbrugne : fix react warning about choice prop
    return (
      <div className={classnames('btn-group', styles.messages)}>
        <Button onClick={this.collapse} bsSize="sm">
          { this.state.collapsed ? 'show messages' : 'hide messages' }
        </Button>
        {types.map((t) => {
          let nb = messages.filter(w => w.type === t).length;

          if (nb < 1) {
            return '';
          }

          if (nb > 100) {
            nb = '100+';
          } else if (nb > 50) {
            nb = '50+';
          } else if (nb > 10) {
            nb = '10+';
          }
          const cssClasses = classnames(
            { [styles.active]: this.state.filter === t }
          );
          return (
            <Button
              key={t}
              bsStyle={t}
              bsSize="sm"
              className={cssClasses}
              onClick={e => this.updateFilter(e, t)}
            >
              {nb}
            </Button>
          );
        })}
        <div className={styles.container}>
          {children}
        </div>
      </div>
    );
  }
}
