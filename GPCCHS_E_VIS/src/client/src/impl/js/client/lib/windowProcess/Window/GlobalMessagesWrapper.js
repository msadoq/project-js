import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Message from '../common/Message';
import styles from './Window.css';

export default class GlobalMessagesWrapper extends Component {

  static propTypes = {
    removeMessage: PropTypes.func.isRequired,
    messages: PropTypes.array,
  };

  state = {
    filter: 'all',
    collapsed: true,
  }

  updateFilter = (e) => {
    if (this.state.collapsed) {
      this.collapse();
    }
    this.setState({
      filter: e.currentTarget.getAttribute('type')
    });
  }

  collapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let messages = this.props.messages.map((m, i) => ({ ...m, index: i }));
    messages = this.state.filter === 'all' ?
      messages
      :
      messages.filter(v => v.type === this.state.filter);

    if (this.state.collapsed) {
      messages = [];
    }
    return (
      <div
        className={styles.globalMessages}
        style={{
          width: '90%',
          maxWidth: '400px',
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 100,
          maxHeight: '400px',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: '35px',
        }}
      >
        <div
          className="text-right"
          style={{
            top: 0,
            right: 0,
            width: '100%',
            position: 'absolute',
          }}
        >
          <span
            className={classnames('badge', styles.collapse, styles.all, styles.badge)}
            onClick={this.collapse}
            type="collapse"
          >
            { this.state.collapsed ? 'EXPAND' : 'COLLAPSE' }
          </span>
          <span
            className={classnames('badge', styles.all, styles.badge, { [styles.active]: this.state.filter === 'all' })}
            onClick={this.updateFilter}
            type="all"
          >
            ALL
          </span>
          {
            ['danger', 'warning', 'info', 'success'].map((v) => {
              let nb = this.props.messages.filter(w => w.type === v).length;
              if (nb > 10) nb = '10+';
              if (nb > 50) nb = '50+';
              if (nb > 100) nb = '100+';
              const cssClasses = classnames(
                'badge',
                styles.badge,
                v,
                { [styles.active]: this.state.filter === v }
              );
              return (
                <span key={v} className={cssClasses} onClick={this.updateFilter} type={v}>
                  {nb}
                </span>
              );
            })
          }
        </div>
        {
          messages.map((v, i) =>
            <Message
              key={i}
              type={v.type}
              message={v.message}
              onClose={this.props.removeMessage.bind(null, 'global', v.index)}
            />
          )
        }
      </div>
    );
  }
}
