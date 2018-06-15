// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : add context menu on links in inspector
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Re add unicode triangles in TreeDecorators component
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import {
  NODE_TYPE_ARRAY as ARRAY,
  NODE_TYPE_ARRAY_ITEM as ARRAY_ITEM,
  NODE_TYPE_OBJECT as OBJECT,
  NODE_TYPE_OBJECT_ITEM as OBJECT_ITEM,
  NODE_TYPE_ITEM as ITEM,
  NODE_TYPE_KEY as KEY,
  NODE_TYPE_LINK as LINK,
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from 'constants';

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

const Toggle = (props) => {
  const style = props.style;
  return (
    <div style={style.base}>
      <div style={style.wrapper}>
        {props.toggled ? '▼' : '►'}
      </div>
    </div>
  );
};

Toggle.propTypes = {
  style: PropTypes.shape({}).isRequired,
  toggled: PropTypes.bool,
};
Toggle.defaultProps = {
  toggled: false,
};


const createContainer = (func) => {
  const Container = (props) => {
    const { node, style } = props;
    // eslint-disable-next-line no-confusing-arrow
    const onMouseDown = event => event.nativeEvent.which === 1
      ? props.onClick() // left click => toggle
      : func(event, node) // right click => contextual menu
    ;

    const containerStyle = style.link;
    const activeStyle = (node.active)
      ? { ...style.link, ...style.activeLink }
      : style.link;
    switch (node.type) {
      case OBJECT:
      case ARRAY:
      case OBJECT_ITEM:
      case ARRAY_ITEM:
      case RESOLVED_LINK:
        return (
          <div
            onMouseDown={onMouseDown}
            style={containerStyle}
          >
            <Header
              node={node}
              style={style.header}
            />
            {' '}
            <Toggle
              style={style.toggle}
              toggled={node.toggled}
            />
          </div>
        );
      default:
        return (
          <div
            onMouseDown={onMouseDown}
            style={activeStyle}
          >
            <Header
              node={node}
              style={style.header}
            />
          </div>
        );
    }
  };
  Container.propTypes = {
    style: PropTypes.shape({
      container: PropTypes.array,
      header: PropTypes.object,
      toggle: PropTypes.object,
    }).isRequired,
    node: PropTypes.shape({
      toggled: PropTypes.bool,
      type: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func,
  };
  return Container;
};

export default function createTreeDecorators(onMouseDown) {
  return {
    Toggle,
    Loading,
    Header,
    Container: createContainer(onMouseDown),
  };
}
