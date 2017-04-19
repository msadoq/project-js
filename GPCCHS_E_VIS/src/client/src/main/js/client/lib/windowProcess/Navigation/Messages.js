import React, { PureComponent, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import Message from '../common/Message';
import styles from './Messages.css';

const types = ['danger', 'warning', 'info', 'success'];

export default class Messages extends PureComponent {
  static propTypes = {
    remove: PropTypes.func.isRequired,
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
            key={v.message}
            type={v.type}
            message={v.message}
            onClose={() => remove('global', i)}
          />
        ));
      });
    }

    // TODO dbrugne : fix react warning about choice prop
    return (
      <div className={classnames('btn-group', styles.messages)}>
        <Button onClick={this.collapse} choice="collapse" bsSize="sm">
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
