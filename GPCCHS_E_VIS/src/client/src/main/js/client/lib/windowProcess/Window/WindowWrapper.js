import React, { Component, PropTypes } from 'react';
import Window from './Window';

export default class WindowWrapper extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    displayHelp: PropTypes.func.isRequired,
    isHelpDisplayed: PropTypes.bool,
  };

  static defaultProps = {
    isHelpDisplayed: false,
  }

  componentDidMount() {
    // hide waiting message
    document.getElementById('waitingRenderer').style.display = 'none';

    document.body.addEventListener('mouseleave', this.triggerMouseUpMouseLeave);
    document.addEventListener('keydown', this.triggerMouseUpEscape);
    document.addEventListener('keydown', this.closeHelpShortCut);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseleave', this.triggerMouseUpMouseLeave);
    document.removeEventListener('keydown', this.triggerMouseUpEscape);
    document.removeEventListener('keydown', this.closeHelpShortCut);
  }

  closeHelpShortCut = (e) => {
    const { displayHelp, windowId, isHelpDisplayed } = this.props;
    if (e.keyCode === 27 && isHelpDisplayed) {
      displayHelp(windowId, !isHelpDisplayed);
    }
  }

  triggerMouseUpMouseLeave = (e) => {
    if (
      e.toElement === null ||
      e.toElement.tagName === 'HTML' // when leaving window with mouse down
    ) {
      const newEvent = new Event('mouseup');
      document.dispatchEvent(newEvent);
    }
  }

  triggerMouseUpEscape = (e) => {
    if (e.keyCode === 27) {
      const newEvent = new Event('mouseup');
      document.dispatchEvent(newEvent);
    }
  }

  render() {
    return (
      <Window {...this.props} />
    );
  }
}
