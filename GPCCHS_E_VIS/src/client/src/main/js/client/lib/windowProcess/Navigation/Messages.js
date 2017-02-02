import React, { PureComponent, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import classnames from 'classnames';
import Message from '../common/Message';
import styles from './Messages.css';

const types = ['danger', 'warning', 'info', 'success'];

export default class Messages extends PureComponent {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    messages: PropTypes.array,
  };

  state = {
    filter: 'all',
    collapsed: false,
  }

  updateFilter = (e) => {
    if (this.state.collapsed) {
      this.collapse();
    }
    this.setState({
      filter: e.currentTarget.getAttribute('choice')
    });
  }

  collapse = () => {
    if (!this.state.collapsed && this.state.filter !== 'all') {
      return this.setState({
        filter: 'all'
      });
    }

    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { messages, remove } = this.props;
    if (!messages || !messages.length) {
      return <Button bsStyle="default">no message</Button>;
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
      <ButtonGroup>
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
              choice={t}
              bsStyle={t}
              bsSize="sm"
              className={cssClasses}
              onClick={this.updateFilter}
            >
              {nb}
            </Button>
          );
        })}
        <div className={styles.container}>
          {children}
        </div>
      </ButtonGroup>
    );
  }
}
