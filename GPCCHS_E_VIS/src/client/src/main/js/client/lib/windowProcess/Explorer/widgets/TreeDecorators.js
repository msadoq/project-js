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
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from 'common/constants';

const Loading = props => (
  <div style={props.style}>
      LOADING...
  </div>
);

Loading.propTypes = {
  style: PropTypes.shape({}).isRequired,
};

const Header = (props) => {
  const style = props.style;
  const node = props.node;
  switch (node.type) {
    case RESOLVED_LINK:
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
};

Header.propTypes = {
  style: PropTypes.shape({}).isRequired,
  node: PropTypes.shape({}).isRequired,
};

class Container extends PureComponent {
  static propTypes = {
    style: PropTypes.shape({
      container: PropTypes.array,
      header: PropTypes.object,
      toggle: PropTypes.object,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    decorators: PropTypes.shape({
      Toggle: PropTypes.func,
    }).isRequired,
    node: PropTypes.shape({
      toggled: PropTypes.bool,
      type: PropTypes.string,
    }).isRequired,
    animations: PropTypes.shape({}).isRequired,
  };

  onMouseDown = (event) => {
    if (event.buttons === 1) {
      this.props.onClick();
    }
  }

  renderToggleDecorator() {
    const Toggle = this.props.decorators.Toggle;
    return (
      <Toggle
        style={this.props.style.toggle}
        toggled={this.props.node.toggled}
      />
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
      case RESOLVED_LINK:
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

export {
  Loading,
  Header,
  Container,
};
