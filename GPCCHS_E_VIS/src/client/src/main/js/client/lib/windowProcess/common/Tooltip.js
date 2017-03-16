import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    getTarget: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const targetRef = this.props.getTarget();
    // eslint-disable-next-line react/no-find-dom-node
    const targetElement = ReactDOM.findDOMNode(targetRef);

    targetElement.addEventListener('click', this.handleTargetClicked);
    // targetElement.addEventListener('focusin', this.handleTargetFocusIn);
    targetElement.addEventListener('blur', this.handleTargetFocusOut);
    // document.body.addEventListener('click', this.handleClick);

    // eslint-disable-next-line react/no-find-dom-node
    const tooltipContainer = ReactDOM.findDOMNode(this.tooltipContainer);
    tooltipContainer.style.display = 'none';
    this.rootNode = document.createElement('div');
    document.body.appendChild(this.rootNode);

    this.rootNode.appendChild(tooltipContainer.childNodes[0]);
    this.rootNode.style.position = 'absolute';
    this.rootNode.style.zIndex = 999;
    this.rootNode.style.display = 'none';
  }
  componentWillUnmount() {
    // document.body.removeEventListener('click', this.handleClick);
    document.body.removeChild(this.rootNode);
  }
  setPosition = () => {
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
  handleTargetFocusOut = () => {
    setTimeout(() => {
      if (!this.rootNode.contains(document.activeElement)) {
        this.rootNode.style.display = 'none';
      }
    });
  }
  render() {
    return (
      <div
        ref={(c) => { this.tooltipContainer = c; }}
      >
        { this.props.children }
      </div>
    );
  }
}
