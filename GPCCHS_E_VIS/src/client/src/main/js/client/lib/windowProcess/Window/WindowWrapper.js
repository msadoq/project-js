import React, { Component } from 'react';
import Window from './Window';

export default class WindowWrapper extends Component {

  state = {
    displayHelp: false,
    displayExplorer: false,
  }

  componentDidMount() {
    document.body.addEventListener('mouseleave', this.triggerMouseUpMouseLeave);
    document.addEventListener('keydown', this.triggerMouseUpEscape);

    document.addEventListener('keydown', this.toggleHelpShortCut);
    document.addEventListener('keydown', this.toggleExplorerShortCut);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleHelpShortCut);
    document.removeEventListener('keydown', this.toggleExplorerShortCut);

    document.body.removeEventListener('mouseleave', this.triggerMouseUpMouseLeave);
    document.removeEventListener('keydown', this.triggerMouseUpEscape);
  }

  toggleHelpShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleHelp();
    } else if (e.keyCode === 27 && this.state.displayHelp) {
      this.toggleHelp();
    }
  }

  toggleHelp = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      displayHelp: !this.state.displayHelp,
    });
  }

  toggleExplorerShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleExplorer();
    } else if (e.keyCode === 27 && this.state.displayExplorer) {
      this.toggleExplorer();
    }
  }

  toggleExplorer = () => {
    this.setState({
      displayExplorer: !this.state.displayExplorer,
    });
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
    const {
      displayHelp,
      displayExplorer,
    } = this.state;
    return (
      <Window
        {...this.props}
        displayHelp={displayHelp}
        displayExplorer={displayExplorer}
      />
    );
  }
}
