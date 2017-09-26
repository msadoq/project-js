// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add Tooltip and use it in dropdown menu
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : REVERT Add Tooltip and use it in dropdown menu"
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Fix Tooltip when collapse and resize window
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add Tooltip and use it in dropdown menu
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Tooltip extends Component {
  static propTypes = {
    getContent: PropTypes.func.isRequired,
    getTarget: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const targetRef = this.props.getTarget();
    // eslint-disable-next-line react/no-find-dom-node
    const targetElement = ReactDOM.findDOMNode(targetRef);
    targetElement.addEventListener('click', this.handleTargetClicked);
    targetElement.addEventListener('blur', this.handleTargetBlur);
    window.addEventListener('resize', this.handleWinResize);

    // eslint-disable-next-line react/no-find-dom-node
    const tooltipContainer = ReactDOM.findDOMNode(this.tooltipContainer);
    tooltipContainer.style.display = 'none';
    this.rootNode = document.createElement('div');
    ReactDOM.render(this.props.getContent(), this.rootNode);
    document.body.appendChild(this.rootNode);

    // this.rootNode.appendChild(tooltipContainer.childNodes[0]);
    this.rootNode.style.position = 'absolute';
    this.rootNode.style.zIndex = 999;
    this.rootNode.style.display = 'none';
    this.rootNode.addEventListener('click', this.hide.bind(this));
  }
  componentWillUpdate() {
    ReactDOM.render(this.props.getContent(), this.rootNode);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleTargetClicked);
    document.body.removeEventListener('blur', this.handleTargetFocusOut);
    window.removeEventListener('resize', this.handleWinResize);
    this.rootNode.style.display = 'block';
    document.body.removeChild(this.rootNode);
  }
  setPosition() {
    const targetRef = this.props.getTarget();
    // eslint-disable-next-line react/no-find-dom-node
    const targetElement = ReactDOM.findDOMNode(targetRef);
    const posY =
      targetElement.getBoundingClientRect().top +
      targetElement.getBoundingClientRect().height;
    const posX =
      targetElement.getBoundingClientRect().left +
      targetElement.getBoundingClientRect().width +
      (this.rootNode.childNodes[0].getBoundingClientRect().width * -1);
    this.rootNode.style.top = `${posY}px`;
    this.rootNode.style.left = `${posX}px`;
  }
  handleTargetClicked = () => {
    if (this.rootNode.style.display === 'block') {
      this.rootNode.style.display = 'none';
    } else {
      this.rootNode.style.display = 'block';
      this.setPosition();
    }
  }
  handleTargetFocusIn = () => {
    this.rootNode.style.display = 'block';
    this.setPosition();
  }

  handleWinResize = () => {
    this.hide();
  }

  hide = () => {
    setTimeout(() => {
      this.rootNode.style.display = 'none';
    });
  }
  handleTargetBlur = () => {
    setTimeout(() => {
      if (!this.rootNode.contains(document.activeElement)) {
        this.hide();
      }
    });
  }
  render() {
    return (
      <div
        ref={(c) => { this.tooltipContainer = c; }}
      />
    );
  }
}
