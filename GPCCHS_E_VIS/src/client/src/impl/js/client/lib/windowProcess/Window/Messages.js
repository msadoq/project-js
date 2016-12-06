import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Message from '../common/Message';
import styles from './Window.css';

export default class Messages extends Component {

  static propTypes = {
    remove: PropTypes.func.isRequired,
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
    const { messages, remove } = this.props;
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
        children.push((
          <Message
            containerId="global"
            key={i}
            type={v.type}
            message={v.message}
            onClose={() => remove('global', i)}
          />
        ));
      });
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
              let nb = messages.filter(w => w.type === v).length;
              if (nb > 100) {
                nb = '100+';
              } else if (nb > 50) {
                nb = '50+';
              } else if (nb > 10) {
                nb = '10+';
              }
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
        {children}
      </div>
    );
  }
}
