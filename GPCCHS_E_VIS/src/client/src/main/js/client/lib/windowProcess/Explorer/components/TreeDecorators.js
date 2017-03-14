import React, { PureComponent, PropTypes } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VelocityComponent } from 'velocity-react';

export function Header(p) {
  const style = p.style;
  const node = p.node;
  switch (node.type) {
    case 'link':
      return (
        <div style={style.base}>
          <div style={style.title}>
            {node.name}: <span style={style.link}>{node.value}</span>
          </div>
        </div>
      );
    case 'key':
      return (
        <div style={style.base}>
          <div style={style.title}>
            {node.name}: {node.value}
          </div>
        </div>
      );
    case 'item':
      return (
        <div style={style.base}>
          <div style={style.title}>
            {node.name}: {node.value}
          </div>
        </div>
      );
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
    if (this.props.node.type === 'object' || this.props.node.type === 'array') {
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
    }
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
