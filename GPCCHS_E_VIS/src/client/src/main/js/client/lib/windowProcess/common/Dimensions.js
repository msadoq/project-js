// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove react-dimensions from project, use custom HOC
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Fix crash introduce in Dimensions.js component
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

import _debounce from 'lodash/debounce';
import React from 'react';
import onElementResize from 'element-resize-event';

function defaultGetDimensions(element) {
  return [element.clientWidth, element.clientHeight];
}

module.exports = function Dimensions({
    getDimensions = defaultGetDimensions,
    debounce = 0,
    debounceOpts = {},
    elementResize = false,
  } = {}) {
  return ComposedComponent => class DimensionsHOC extends React.Component {
    // ES7 Class properties
    // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers
    state = {}

    // Using arrow functions and ES7 Class properties to autobind
    // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions

    // Immediate updateDimensions callback with no debounce
    updateDimensionsImmediate = () => {
      const dimensions = getDimensions(this._parent);

      if (dimensions[0] !== this.state.containerWidth ||
          dimensions[1] !== this.state.containerHeight) {
        this.setState({
          containerWidth: dimensions[0],
          containerHeight: dimensions[1],
        });
      }
    }

    // Optionally-debounced updateDimensions callback
    updateDimensions = debounce === 0 ? this.updateDimensionsImmediate
      : _debounce(this.updateDimensionsImmediate, debounce, debounceOpts)

    onResize = () => {
      if (this.rqf) return;
      this.rqf = window.requestAnimationFrame(() => {
        this.rqf = null;
        this.updateDimensions();
      });
    }

    componentDidMount() {
      if (!this.instance) {
        throw new Error('Cannot find wrapped instance');
      }
      this._parent = this.instance.parentNode;
      this.updateDimensionsImmediate();
      if (elementResize) {
        // Experimental: `element-resize-event` fires when an element resizes.
        // It attaches its own window resize listener and also uses
        // requestAnimationFrame, so we can just call `this.updateDimensions`.
        onElementResize(this._parent, this.updateDimensions);
      } else {
        window.addEventListener('resize', this.onResize, false);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      // TODO: remote element-resize-event listener.
      // pending https://github.com/KyleAMathews/element-resize-event/issues/2
    }

    /*
     * Returns the underlying wrapped component instance.
     * Useful if you need to access a method or property of the component
     * passed to react-dimensions.
     *
     * @return {object} The rendered React component
     */
    getWrappedInstance = () => this.instance;
    setWrappedInstance = (el) => {
      this.instance = el;
    }

    render() {
      const { containerWidth, containerHeight } = this.state;
      const wrapperStyle = {
        overflow: 'visible',
        height: 0,
        width: 0,
      };
      if (containerWidth || containerHeight) {
        return (
          <ComposedComponent
            {...this.state}
            {...this.props}
            updateDimensions={this.updateDimensions}
            ref={this.setWrappedInstance}
          />
        );
      }
      return <div style={wrapperStyle} ref={this.setWrappedInstance} />;
    }
  };
};
