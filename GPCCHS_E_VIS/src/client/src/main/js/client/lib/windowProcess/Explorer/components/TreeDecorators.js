import React, { PureComponent, PropTypes } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VelocityComponent } from 'velocity-react';
import {
  NODE_TYPE_ARRAY as ARRAY,
  NODE_TYPE_ARRAY_ITEM as ARRAY_ITEM,
  NODE_TYPE_OBJECT as OBJECT,
  NODE_TYPE_OBJECT_ITEM as OBJECT_ITEM,
  NODE_TYPE_ITEM as ITEM,
  NODE_TYPE_KEY as KEY,
  NODE_TYPE_LINK as LINK,
} from 'common/constants';

export function Header(p) {
  const style = p.style;
  const node = p.node;
  switch (node.type) {
    case LINK:
      return (
        <div style={style.base}>
          <div>
            <span style={style.title}>{node.name}:</span>
            {' '}
            <span style={style.link}>{node.value}</span>
          </div>
        </div>
      );
    case KEY:
      return (
        <div style={style.base}>
          <div>
            <span style={style.title}>{node.name}:</span>
            {' '}
            <span style={style.value}>{node.value}</span>
          </div>
        </div>
      );
    case ITEM:
      return (
        <div style={style.base}>
          <div>
            <span style={style.item}>item {node.name}</span>
            {' '}
            <span style={style.value}>{node.value}</span>
          </div>
        </div>
      );
    case ARRAY_ITEM:
      return (
        <div style={style.base}>
          <div>
            <span style={style.item}>item {node.name}</span>
            {' '}
            <span style={style.item}> - {node.children.length} item(s)</span>
          </div>
        </div>
      );
    case OBJECT_ITEM:
      return (
        <div style={style.base}>
          <div>
            <span style={style.item}>item {node.name}</span>
          </div>
        </div>
      );
    case ARRAY:
      return (
        <div style={style.base}>
          <div>
            <span style={style.title}>{node.name}</span>
            {' '}
            <span style={style.item}> - {node.children.length} item(s)</span>
          </div>
        </div>
      );
    case OBJECT:
    default:
      return (
        <div style={style.base}>
          <div style={style.title}>
            {node.name}
          </div>
        </div>
      );
  }
}

export class Container extends PureComponent {
  static propTypes = {
    style: PropTypes.shape({
      container: PropTypes.array,
      header: PropTypes.object,
      toggle: PropTypes.object,
    }),
    decorators: PropTypes.shape({
      Toggle: PropTypes.func,
    }),
    onClick: PropTypes.func,
    node: PropTypes.shape({
      type: PropTypes.string,
    }),
    animations: PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
    decorators: {},
    onClick: () => {},
    node: {},
    animations: {},
  };

  onMouseDown = (event) => {
    if (event.buttons === 1) {
      this.props.onClick();
    }
  }

  renderToggleDecorator() {
    const Toggle = this.props.decorators.Toggle;
    return (
      <Toggle style={this.props.style.toggle} />
    );
  }

  renderToggle() {
    const animations = this.props.animations;
    if (!animations) {
      return this.renderToggleDecorator();
    }
    return (
      <VelocityComponent
        duration={animations.toggle.duration}
        animation={animations.toggle.animation}
      >
        {this.renderToggleDecorator()}
      </VelocityComponent>
    );
  }

  render() {
    switch (this.props.node.type) {
      case OBJECT:
      case ARRAY:
      case OBJECT_ITEM:
      case ARRAY_ITEM:
        return (
          <div
            onMouseDown={this.onMouseDown}
            style={this.props.style.container}
          >
            <Header
              node={this.props.node}
              style={this.props.style.header}
            />
            {' '}
            {this.renderToggle()}
          </div>
        );
      default:
        return (
          <div
            onMouseDown={this.onMouseDown}
            style={this.props.style.container}
          >
            <Header
              node={this.props.node}
              style={this.props.style.header}
            />
          </div>
        );
    }
  }
}
